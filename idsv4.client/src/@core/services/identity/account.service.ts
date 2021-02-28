import { Injectable } from '@angular/core';
import { HttpApiService } from '../http-api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../app/initialize/services/config.service';
import { Endpoints } from '../../constants/endpoints';
import { LoginModel } from '../../models/accounts/login.model';
import { Observable } from 'rxjs';
import { RegisterModel } from '../../models/accounts/register.model';

@Injectable({
    providedIn: 'root'
})
export class AccountService extends HttpApiService {

    public constructor(
        protected http: HttpClient,
        protected config: ConfigService,
        private endpoints: Endpoints
    ) {
        super(http, config);
    }

    public getFullApiUrl(url: string): string {
        return this.config.settings.defaultAppUrl + url;
    }

    public login = (loginModel: LoginModel): Observable<string> => {
        return this.post<LoginModel, string>(
            this.endpoints.accounts.signIn, loginModel);
    };

    public register = (registerModel: RegisterModel): Observable<void> => {
        return this.post<RegisterModel, void>(
            this.endpoints.accounts.signUp, registerModel
        );
    };

}
