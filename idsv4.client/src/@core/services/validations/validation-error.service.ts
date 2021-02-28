import { get } from 'lodash';
import { Injectable, isDevMode } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorCodeEnum } from '../../enums/error-code.enum';

@Injectable({
    providedIn: 'root'
})
export class ValidationErrorService {

    public getValidationErrorMessage(control: AbstractControl): string {
        if (!control.errors) {
            return null;
        }

        if (control.hasError(ErrorCodeEnum.serverError)) {
            return control.getError(ErrorCodeEnum.serverError);
        }

        if (control.hasError(ErrorCodeEnum.required)) {
            return 'Required field';
        }

        if (control.hasError(ErrorCodeEnum.email)) {
            return 'The field must contain a valid email address';
        }

        if (control.hasError(ErrorCodeEnum.minLength)) {
            const error = control.getError(ErrorCodeEnum.minLength);
            return `The field must contain at least ${ get(error, 'requiredLength') } digits`;
        }

        if (control.hasError(ErrorCodeEnum.maxLength)) {
            const error = control.getError(ErrorCodeEnum.maxLength);
            return `The field must contain no more than ${ get(error, 'requiredLength') } digits`;
        }

        if (control.hasError(ErrorCodeEnum.min)) {
            const error = control.getError(ErrorCodeEnum.min);
            return `Minimum allowed value ${ get(error, 'min.min') }`;
        }

        if (control.hasError(ErrorCodeEnum.max)) {
            const error = control.getError(ErrorCodeEnum.max);
            return `Maximum allowed value ${ get(error, 'max.max') }`;
        }

        if (isDevMode()) {
            console.warn('Unknown validation error', control.errors);
        }

        return null;
    }

}
