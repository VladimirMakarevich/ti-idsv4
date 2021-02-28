import { Injectable, isDevMode } from '@angular/core';
import { User, UserManager, UserManagerSettings } from 'oidc-client';
import { BehaviorSubject, concat, from, Observable } from 'rxjs';
import { filter, map, mergeMap, take, tap } from 'rxjs/operators';
import { AuthenticationResultStatus, IAuthenticationResult } from '../types/auth-result';
import { AuthApiService } from '../../../@core/services/identity/auth-api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userManager: UserManager;
    private userSubject: BehaviorSubject<User | null> = new BehaviorSubject(null);

    public constructor(
        private service: AuthApiService
    ) {
    }

    public isAuthenticated(): Observable<boolean> {
        return this.getUser().pipe(take(1), map(u => !!u));
    }

    // We try to authenticate the user in three different ways:
    // 1) We try to see if we can authenticate the user silently. This happens
    //    when the user is already logged in on the IdP and is done using a hidden iframe
    //    on the client.
    // 2) If the two methods above fail, we redirect the browser to the IdP to perform a traditional
    //    redirect flow.
    public async signIn(state: any): Promise<IAuthenticationResult> {
        await this.initUserManager();
        let user: User = null;
        try {
            user = await this.userManager.signinSilent(this.createArguments());
            this.userSubject.next(user);
            return this.success(state);
        } catch (silentError) {
            try {
                await this.userManager.signinRedirect(this.createArguments(state));
                return this.redirect();
            } catch (redirectError) {
                return this.error(redirectError);
            }
        }
    }

    public async completeSignIn(url: string): Promise<IAuthenticationResult> {
        try {
            await this.initUserManager();
            const user = await this.userManager.signinCallback(url);
            this.userSubject.next(user);
            return this.success(user && user.state);
        } catch (error) {
            return this.error('There was an error signing in.');
        }
    }

    public async signOut(state: any): Promise<IAuthenticationResult> {
        try {
            await this.userManager.signoutRedirect(this.createArguments(state));
            return this.redirect();
        } catch (redirectSignOutError) {
            console.log('Redirect signout error: ', redirectSignOutError);
            return this.error(redirectSignOutError);
        }
    }

    public getUser(): Observable<User | null> {
        return concat(
            this.userSubject.pipe(take(1), filter(u => !!u)),
            this.getUserFromStorage().pipe(
                filter(user => !!user),
                tap(user => {
                    this.userSubject.next(user);
                    return user;
                })),
            this.userSubject.asObservable()
        );
    }

    public async initUserManager(): Promise<void> {
        if (this.userManager) {
            return;
        }

        const settingsResponse = await this.service.signInApiRequest();
        if (!Boolean(settingsResponse)) {
            throw new Error('Could not load settings for');
        }

        const settings: UserManagerSettings = {
            authority: settingsResponse.auth.authority,
            client_id: settingsResponse.auth.client_id,
            redirect_uri: settingsResponse.auth.redirect_uri,
            scope: settingsResponse.auth.scope,
            response_type: settingsResponse.auth.response_type,
            post_logout_redirect_uri: settingsResponse.auth.post_logout_redirect_uri,
            silent_redirect_uri: settingsResponse.auth.redirect_uri,
            automaticSilentRenew: true,
            includeIdTokenInSilentRenew: true,
        };

        if (isDevMode()) {
            console.log('settings >>>>>>>>>>>>> ', settings);
        }

        this.userManager = new UserManager(settings);

        this.userManager.events.addUserSignedOut(async () => {
            await this.userManager.removeUser();
            this.userSubject.next(null);
        });
    }

    private createArguments(state?: any): any {
        return {useReplaceToNavigate: true, data: state};
    }

    private error(message: string): IAuthenticationResult {
        return {status: AuthenticationResultStatus.Fail, message};
    }

    private success(state: any): IAuthenticationResult {
        return {status: AuthenticationResultStatus.Success, state};
    }

    private redirect(): IAuthenticationResult {
        return {status: AuthenticationResultStatus.Redirect};
    }

    private getUserFromStorage(): Observable<User> {
        return from(this.initUserManager())
            .pipe(
                mergeMap(() => this.userManager.getUser()));
    }
}
