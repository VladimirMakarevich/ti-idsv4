import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormContext } from '../../@core/forms/form.context';
import { AsyncValidationService } from '../../@core/services/validations/async-validation.service';
import { RegisterModel } from '../../@core/models/accounts/register.model';

export class SignUpForm extends FormContext<RegisterModel> {

  public constructor(
    public form: FormGroup,
    public model: RegisterModel
  ) {
    super(form, model);
  }

  public get password(): FormControl {
    return this.getControl('password');
  }

  public get email(): FormControl {
    return this.getControl('email');
  }

  public get userName(): FormControl {
    return this.getControl('userName');
  }

  public get passwordConfirm(): FormControl {
    return this.getControl('passwordConfirm');
  }

  public static createForm(model: RegisterModel, asyncValidationService: AsyncValidationService)
    : SignUpForm {
    const form = new FormGroup({
      password: new FormControl(model ? model.password : null, [Validators.required, Validators.maxLength(255)]),
      email: new FormControl(model ? model.email : null, [Validators.required, Validators.maxLength(255)]),
      userName: new FormControl(model ? model.userName : null, [Validators.required, Validators.maxLength(255)]),
      passwordConfirm: new FormControl(model ? model.passwordConfirm : null, [Validators.required, Validators.maxLength(255), confirmPasswordValidator])
    }, {updateOn: 'blur'});

    return new SignUpForm(form, model);
  }

  public getFormData(): RegisterModel {
    return this.form.getRawValue();
  }

}


export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return {passwordsNotMatching: true};
};
