import { ModelBase } from '../model.base';

export class UserModel extends ModelBase {
    public id: string;
    public firstName: string;
    public lastName: string;
    public userName: string;
    public token: string;
    public phone: string;
    public secondEmail: string;
    public skype: string;
    public linkedIn: string;
    public country: string;
    public city: string;
    public email: string;
    public birth?: any;

}
