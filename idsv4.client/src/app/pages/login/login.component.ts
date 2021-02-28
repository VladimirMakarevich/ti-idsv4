import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { appAnimations } from '../../../@examine/animations';
import { SignInForm } from '../../forms/sign-in.form';
import { ControlStateMatcher } from '../../../@core/forms/control.state-matcher';
import { ActivatedRoute, Router } from '@angular/router';
import { OidcComponent } from '../oidc.component';
import { LoginSandbox } from './login.sandbox';
import { Routing } from '../../../@core/routing/routing.facade';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: appAnimations,
    providers: [LoginSandbox]
})
export class LoginComponent extends OidcComponent implements OnInit {
    public form: SignInForm;

    public controlStateMatcher: ControlStateMatcher;

    public get isValidForm(): boolean {
        return this.form.validate();
    }

    public constructor(
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        private sandbox: LoginSandbox
    ) {
        super(activatedRoute, router);
    }

    public ngOnInit(): void {
        const returnUrl = this.getReturnUrl();
        if (!Boolean(returnUrl)) {
            this.router.navigate(Routing.account.signInUrl);
        }
        this.form = this.sandbox.createForm();
        this.controlStateMatcher = new ControlStateMatcher();
    }

    public handleSignIn(event: Event): void {
        event.stopPropagation();
        if (!this.form.validate) {
            return;
        }
        const returnUrl = this.getReturnUrl();

        this.subscriptions.push(
            this.sandbox.handleSignIn(this.form, returnUrl).subscribe(
                (response) => {
                    window.location.assign(returnUrl);
                }
            )
        );
    }
}
