import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputControlComponent } from './input/input.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCheckboxModule,
    ],
    exports: [
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,

        InputControlComponent,
        CheckboxComponent
    ],
    declarations: [
        InputControlComponent,
        CheckboxComponent
    ],
    providers: []
})
export class ControlModule {
}
