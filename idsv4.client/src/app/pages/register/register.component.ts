import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { appAnimations } from '../../../@examine/animations';
import { OidcComponent } from '../oidc.component';
import { ControlStateMatcher } from '../../../@core/forms/control.state-matcher';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpForm } from '../../forms/sign-up.form';
import { Routing } from '../../../@core/routing/routing.facade';
import { RegisterSandbox } from './register.sandbox';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: appAnimations,
    providers: [RegisterSandbox]
})
export class RegisterComponent extends OidcComponent implements OnInit {
    public form: SignUpForm;

    public controlStateMatcher: ControlStateMatcher;

    public get isValidForm(): boolean {
        return this.form.validate();
    }

    public constructor(
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        private sandbox: RegisterSandbox
    ) {
        super(activatedRoute, router);
    }

    public ngOnInit(): void {
        this.form = this.sandbox.createForm();
        this.controlStateMatcher = new ControlStateMatcher();
    }

    public handleSignUp(event: Event): void {
        event.stopPropagation();
        if (!this.form.validate) {
            return;
        }

        this.subscriptions.push(
            this.sandbox.handleSignUp(this.form).subscribe(() => {
                    this.router.navigate(Routing.account.signInUrl);
                }
            )
        );
    }
}
