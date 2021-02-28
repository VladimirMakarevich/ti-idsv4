import { ModelBase } from '../model.base';

export class ResetPasswordModel extends ModelBase {
  public email: string;
  public password: string;
  public confirmPassword: string;
  public code: string;

}
