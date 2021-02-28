import { Component, forwardRef, Input } from '@angular/core';
import { ControlDirective } from '../control.directive';

@Component({
  selector: 'app-checkbox-control',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {provide: ControlDirective, useExisting: forwardRef(() => CheckboxComponent)}
  ]
})
export class CheckboxComponent extends ControlDirective {

  @Input()
  public isCustomErrorState: boolean;

}
