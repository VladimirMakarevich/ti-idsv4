import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MailConfirmComponent } from './mail-confirm.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes = [
    {
        path: '',
        component: MailConfirmComponent
    }
];

@NgModule({
    declarations: [
        MailConfirmComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatIconModule,
        FlexLayoutModule
    ]
})
export class MailConfirmModule {
}
