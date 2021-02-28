import { ModelBase } from '../model.base';

export class LoginModel extends ModelBase {
  public email: string;
  public password: string;
  public rememberMe: boolean;
  public returnUrl: string;

}
