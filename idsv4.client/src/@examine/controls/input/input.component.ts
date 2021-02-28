import { Component, ElementRef, HostBinding, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ValidationErrorService } from '../../../@core/services/validations/validation-error.service';
import { MatInput } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-input-control',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputControlComponent {

  @Input()
  public icon = '';

  @Input()
  public type = 'text';

  @Input()
  public maxLength = 255;

  @Input()
  public short: boolean;

  @Input()
  public placeholder: string;

  @Input()
  public focusOnInit: boolean;

  @Input()
  public name = '';

  @Input()
  public trimOnBlur = true;

  @Input()
  public pattern: RegExp;

  @HostBinding('class.app-input-control')
  public controlClass = true;

  @Input()
  public control: FormControl;

  @Input()
  public errorStateMatcher: ErrorStateMatcher;

  @ViewChild(MatInput, {static: true})
  public input: MatInput;

  @ViewChild(MatInput, {read: ElementRef, static: true})
  public inputElement: ElementRef;

  public get error(): string {
    return this.validationErrorService.getValidationErrorMessage(this.control);
  }

  public constructor(
    protected validationErrorService: ValidationErrorService
  ) {
  }

}
