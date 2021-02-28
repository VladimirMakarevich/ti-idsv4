import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { ControlModule } from '../../../@examine/controls/control.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

const routes = [
    {
        path: '',
        component: RegisterComponent
    }
];

@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        ControlModule,
        MatButtonModule,
        FlexLayoutModule
    ]
})
export class RegisterModule {
}
