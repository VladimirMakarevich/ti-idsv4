import { trim } from 'lodash';
import { Directive, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { ValidationErrorService } from '../../@core/services/validations/validation-error.service';
import { MatInput } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';

@Directive({
  selector: '[appControl]'
})
export class ControlDirective implements OnInit, OnDestroy {

  @Input()
  public placeholder: string;

  @Input()
  public control: AbstractControl = new FormControl();

  @Input()
  public focusOnInit: boolean;

  @Input()
  public name = '';

  @Input()
  public errorStateMatcher: ErrorStateMatcher;

  @ViewChild(MatInput, {static: true})
  public input: MatInput;

  @ViewChild(MatInput, {read: ElementRef, static: true})
  public inputElement: ElementRef;

  public get error(): string {
    return this.validationErrorService.getValidationErrorMessage(this.control);
  }

  protected blurEventSubscription: Subscription;

  public constructor(
    protected validationErrorService: ValidationErrorService
  ) {
  }

  public ngOnInit(): void {
    if (this.focusOnInit) {
      this.focus();
    }
  }

  public ngOnDestroy(): void {
    if (this.blurEventSubscription) {
      this.blurEventSubscription.unsubscribe();
      this.blurEventSubscription = null;
    }
  }

  public focus(): void {
    if (this.input) {
      this.input.focus();
    }
  }

  protected handleBlur(): void {
    if (this.inputElement) {
      this.blurEventSubscription = fromEvent(this.inputElement.nativeElement, 'blur').subscribe(this.trimControlValue);
    }
  }

  protected trimControlValue = (event: Event): void => {
    this.control.patchValue(trim(this.control.value), {onlySelf: true, emitEvent: false});
  };

}
