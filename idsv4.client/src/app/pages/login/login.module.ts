import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login.component';
import { ControlModule } from '../../../@examine/controls/control.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes = [
    {
        path: '',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        ControlModule,
        MatButtonModule,
        FlexLayoutModule
    ]
})
export class LoginModule {
}
