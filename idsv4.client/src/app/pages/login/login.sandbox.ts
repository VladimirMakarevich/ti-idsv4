import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SandboxBase } from '../../../@core/sandboxes/sandbox-base';
import { LoginModel } from '../../../@core/models/accounts/login.model';
import { AuthApiService } from '../../../@core/services/identity/auth-api.service';
import { AsyncValidationService } from '../../../@core/services/validations/async-validation.service';
import { SignInForm } from '../../forms/sign-in.form';


@Injectable()
export class LoginSandbox extends SandboxBase {

    private loginModel: LoginModel;

    public constructor(
        private router: Router,
        private service: AuthApiService,
        private asyncValidationService: AsyncValidationService
    ) {
        super();
    }

    public handleSignIn = (signForm: SignInForm, returnUrl: string): Observable<any> => {
        const request = {...this.loginModel, ...signForm.getFormData()} as LoginModel;
        request.returnUrl = returnUrl;
        return this.service.signIn(request);
    };

    public createForm(): SignInForm {
        this.loginModel = new LoginModel();
        return SignInForm.createForm(this.loginModel, this.asyncValidationService);
    }

}
