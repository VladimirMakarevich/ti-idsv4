import { Endpoints } from './../../constants/endpoints';
import { ErrorResponseModel } from '../../models/validations/error-response.model';
import { ConfigService } from '../../../app/initialize/services/config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpApiService } from '../http-api.service';
import { Injectable } from '@angular/core';
import { head, set } from 'lodash';
import { ValidationErrorModel } from '../../models/validations/validation-error.model';

@Injectable({
    providedIn: 'root'
})
export class AsyncValidationService extends HttpApiService {

    public constructor(
        protected http: HttpClient,
        protected config: ConfigService,
        public endpoints: Endpoints
    ) {
        super(http, config);
    }

    public getFullApiUrl(url: string): string {
        return this.config.settings.defaultAppUrl + url;
    }

    public createEmailAsyncValidator(email: AbstractControl): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return this.get<any, ErrorResponseModel>(
                this.getFullApiUrl(this.endpoints.validations.email), {email: email.value}).pipe(
                map((response: ErrorResponseModel) => this.getValidationResult(response, control))
            );
        };
    }

    private getValidationResult = (response: ErrorResponseModel, control: AbstractControl)
        : ValidationErrors | null => {
        const error = head(response.errors);
        return Boolean(error) ? set(new ValidationErrorModel(), error.key, error.message) : null;
    };

}
