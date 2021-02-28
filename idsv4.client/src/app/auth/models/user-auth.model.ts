export interface UserModelInterface {
    email: string;
    email_verified: string;
    family_name: string;
    given_name: string;
    name: string;
    preferred_username: string;
    sub: string;
    website: string;
    role: Array<string>;
}

export class UserAuthModel {

    public email: string;
    // tslint:disable-next-line:variable-name
    public email_verified: boolean;
    // tslint:disable-next-line:variable-name
    public family_name: string;
    // tslint:disable-next-line:variable-name
    public given_name: string;
    public name: string;
    // tslint:disable-next-line:variable-name
    public preferred_username: string;
    public sub: string;
    public website: string;
    public role: Array<string>;

    public constructor(
        model: any
    ) {
        this.email = model.email;
        this.email_verified = model.email_verified === 'true';
        this.family_name = model.family_name;
        this.given_name = model.given_name;
        this.name = model.name;
        this.preferred_username = model.preferred_username;
        this.sub = model.sub;
        this.website = model.website;
        this.role = model.role;
    }
}
