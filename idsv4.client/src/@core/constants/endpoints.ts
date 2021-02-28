import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Endpoints {
    public get accounts() {
        return accounts;
    }

    public get validations() {
        return validation;
    }

    public get cdn() {
        return cdn;
    }

    public get config() {
        return config;
    }

}

export const accounts = {
    signIn: '/api/account/sign-in/',
    signUp: '/api/account/sign-up/',
    signOut: '/api/account/sign-out/',
    resetPassword: '/api/account/reset-password/',
    forgotPassword: '/api/account/forgot-password/'

};

export const validation = {
    email: '/api/validation/email/'

};

export const cdn = {
    getImage: '/cdn/img?token=',
    uploadFile: '/cdn/upload'
};

export const config = {
    configUrl: '/api/config/application',
    api: '/api/config'
};
