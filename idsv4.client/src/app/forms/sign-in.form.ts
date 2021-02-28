import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormContext } from '../../@core/forms/form.context';
import { LoginModel } from '../../@core/models/accounts/login.model';
import { AsyncValidationService } from '../../@core/services/validations/async-validation.service';

export class SignInForm extends FormContext<LoginModel> {

  public constructor(
    public form: FormGroup,
    public login: LoginModel
  ) {
    super(form, login);
  }

  public get password(): FormControl {
    return this.getControl('password');
  }

  public get email(): FormControl {
    return this.getControl('email');
  }

  public get rememberMe(): FormControl {
    return this.getControl('rememberMe');
  }

  public static createForm(model: LoginModel, asyncValidationService: AsyncValidationService)
    : SignInForm {
    const form = new FormGroup({
      password: new FormControl(model ? model.password : null, [Validators.required, Validators.maxLength(255)]),
      email: new FormControl(model ? model.email : null, [Validators.required, Validators.maxLength(255)]),
      rememberMe: new FormControl(model ? model.rememberMe : null)
    }, {updateOn: 'blur'});

    // const email = form.get('email');
    // email.setAsyncValidators([
    //     asyncValidationService.createEmailAsyncValidator(email)
    // ]);

    return new SignInForm(form, model);
  }

  public getFormData(): LoginModel {
    return this.form.getRawValue();
  }

}
