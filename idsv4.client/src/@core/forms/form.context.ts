import { each } from 'lodash';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ErrorCodeEnum } from '../enums/error-code.enum';
import { ErrorInfoModel } from '../models/validations/error-info.model';

export abstract class FormContext<T> {

    public static SERVER_ERROR_KEY = ErrorCodeEnum.serverError;

    public validated: boolean;
    public formValidity = new Subject<boolean>();
    private isFormDisabled: boolean;

    public static touchAll(control: AbstractControl): void {
        control.markAsTouched({onlySelf: false});
        if (control instanceof FormGroup) {
            each((control as FormGroup).controls, FormContext.touchAll);
        }
        if (control instanceof FormArray) {
            each((control as FormArray).controls, FormContext.touchAll);
        }
    }

    public update = (data?: any): void => (null);

    public setFormError = (error: ErrorInfoModel): void => {
        const control = this.getControl(error.key);
        if (control) {
            control.setErrors({[FormContext.SERVER_ERROR_KEY]: error.message});
        }
    };

    protected constructor(
        public form: FormGroup,
        public data: T = null,
    ) {
    }

    public get touched(): boolean {
        return this.form.touched;
    }

    public get pristine(): boolean {
        return this.form.pristine;
    }

    public get dirty(): boolean {
        return this.form.dirty;
    }

    public get invalid(): boolean {
        return this.form.invalid;
    }

    public get isDisabled(): boolean {
        return this.isFormDisabled;
    }

    public get valueChanges(): Observable<T> {
        return this.form.valueChanges;
    }

    public isValid(): boolean {
        return this.form.valid;
    }

    public abstract getFormData(): T;

    public validate(): boolean {
        this.validated = true;
        FormContext.touchAll(this.form);
        this.formValidity.next(this.form.valid);

        return this.form.valid;
    }

    public resetForm(data?: T, options?: object): void {
        this.validated = false;
        if (data) {
            this.data = data;
        }

        this.form.reset(this.data || {}, options);
    }

    public patchForm(data: Partial<T>): void {
        this.form.patchValue(data);
    }

    public getFieldValue(key: string): any {
        const control = this.getControl(key);
        return control ? control.value : null;
    }

    public resetControl(key: string, value?: any): void {
        const control = this.getControl(key);
        if (control) {
            control.reset(value);
        }
    }

    public markAsPristine(): void {
        this.form.markAsPristine({onlySelf: true});
    }

    public markAsUntouched(): void {
        this.form.markAsUntouched({onlySelf: true});
    }


    public markAsDirty(): void {
        this.form.markAsDirty({onlySelf: true});
    }

    public getControl(key: string): FormControl | null {
        return this.form.get(key) as FormControl;
    }

    public disableForm(options?: object): void {
        this.form.disable(options);
        this.isFormDisabled = true;
    }

    public enableForm(options?: object): void {
        this.form.enable(options);
        this.isFormDisabled = false;
    }

    public setFormErrors(errors: Array<ErrorInfoModel>): void {
        each(errors, this.setFormError);
    }

}
