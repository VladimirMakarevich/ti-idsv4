import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SandboxBase } from '../../../@core/sandboxes/sandbox-base';
import { AuthApiService } from '../../../@core/services/identity/auth-api.service';
import { AsyncValidationService } from '../../../@core/services/validations/async-validation.service';
import { RegisterModel } from '../../../@core/models/accounts/register.model';
import { SignUpForm } from '../../forms/sign-up.form';


@Injectable()
export class RegisterSandbox extends SandboxBase {

    private registerModel: RegisterModel;

    public constructor(
        private router: Router,
        private service: AuthApiService,
        private asyncValidationService: AsyncValidationService
    ) {
        super();
    }

    public handleSignUp = (form: SignUpForm): Observable<any> => {
        const request = {...this.registerModel, ...form.getFormData()} as RegisterModel;
        return this.service.signUp(request);
    };

    public createForm(): SignUpForm {
        this.registerModel = new RegisterModel();
        return SignUpForm.createForm(this.registerModel, this.asyncValidationService);
    }

}
