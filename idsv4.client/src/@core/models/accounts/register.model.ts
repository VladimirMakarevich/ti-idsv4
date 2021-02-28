import { ModelBase } from '../model.base';

export class RegisterModel extends ModelBase {
  public userName: string;
  public email: string;
  public password: string;
  public passwordConfirm: string;

}
