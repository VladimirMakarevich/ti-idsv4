import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterModel } from '../../models/accounts/register.model';
import { LoginModel } from '../../models/accounts/login.model';
import { Endpoints } from '../../constants/endpoints';
import { HttpApiService } from '../http-api.service';
import { ConfigService } from '../../../app/initialize/services/config.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthApiService extends HttpApiService {

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

    public signIn = (loginModel: LoginModel): Observable<any> => {
        return this.post(this.endpoints.accounts.signIn, loginModel);
    };

    public signUp = (registerModel: RegisterModel): Observable<void> => {
        return this.post(this.endpoints.accounts.signUp, registerModel);
    };

    public signInApiRequest = (): Promise<any> => {
        return this.get(this.endpoints.config.api, null).toPromise();
    };

}
