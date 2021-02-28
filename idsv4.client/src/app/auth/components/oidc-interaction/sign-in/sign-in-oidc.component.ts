import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { AccountRouter } from '../../../../../@core/routing/routers/account.router';
import { QueryParameterNames } from '../../../types/api-auth.constants';
import { AuthenticationResultStatus } from '../../../types/auth-result';
import { Log } from '../../../../../@core/services/logger/log.service';
import { INavigationState, OidcComponent } from '../../../../pages/oidc.component';

@Component({
    selector: 'app-sign-in-oidc',
    templateUrl: './sign-in-oidc.component.html',
})
export class SignInOidcComponent extends OidcComponent implements OnInit {

    public constructor(
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        private authService: AuthService
    ) {
        super(activatedRoute, router);
    }

    public async ngOnInit(): Promise<void> {
        await this.init();
    }

    private async init(): Promise<void> {
        const action = this.activatedRoute.snapshot.url[1] || this.activatedRoute.snapshot.url[0];
        switch (action.path) {
            case AccountRouter.signIn:
                await this.login(this.getReturnUrl());
                break;
            case AccountRouter.signInCallback:
                await this.processLoginCallback();
                break;
            case AccountRouter.signInFailed:
                const message = this.activatedRoute.snapshot.queryParamMap.get(QueryParameterNames.Message);
                Log.message(message);
                break;
            default:
                throw new Error(`Invalid action '${ action }'`);
        }
    }

    private async login(returnUrl: string): Promise<void> {
        const state: INavigationState = {returnUrl};
        const result = await this.authService.signIn(state);
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
                throw new Error(`Invalid status result ${ (result as any).status }.`);
        }
    }

    private async processLoginCallback(): Promise<void> {
        const url = window.location.href;
        const result = await this.authService.completeSignIn(url);
        switch (result.status) {
            case AuthenticationResultStatus.Success:
                await this.navigateToReturnUrl(this.getReturnUrl(result.state));
                break;
            case AuthenticationResultStatus.Fail:
                break;
        }
    }

}
