import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from '../../../services/auth-service';
import { AuthenticationResultStatus } from '../../../types/auth-result';
import { Log } from '../../../../../@core/services/logger/log.service';
import { AuthApiService } from '../../../../../@core/services/identity/auth-api.service';
import { INavigationState, OidcComponent } from '../../../../pages/oidc.component';

// The main responsibility of this component is to handle the user's Logout process.
// This is the starting point for the Logout process, which is usually initiated when a
// user clicks on the Logout button.
@Component({
    selector: 'app-sign-out-oidc',
    templateUrl: './sign-out-oidc.component.html',
    providers: [AuthApiService]
})
export class SignOutOidcComponent extends OidcComponent implements OnInit {

    public constructor(
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        private authService: AuthService,
        private signOutService: AuthApiService,
    ) {
        super(activatedRoute, router);
    }

    public async ngOnInit(): Promise<void> {
        if (!!window.history.state.local) {
            await this.logout(this.getReturnUrl());
        }
    }

    private async logout(returnUrl: string): Promise<void> {
        const state: INavigationState = {returnUrl};
        const isAuthenticated = await this.authService.isAuthenticated().pipe(
            take(1)
        ).toPromise();

        if (isAuthenticated) {
            const result = await this.authService.signOut(state);
            switch (result.status) {
                case AuthenticationResultStatus.Redirect:
                    break;
                case AuthenticationResultStatus.Success:
                    await this.navigateToReturnUrl(returnUrl);
                    break;
                case AuthenticationResultStatus.Fail:
                    Log.message(result.message);
                    break;
                default:
                    throw new Error('Invalid authentication result status.');
            }
        }
    }

}
