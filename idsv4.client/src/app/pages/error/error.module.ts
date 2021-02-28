import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ErrorComponent } from './error.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes = [
    {
        path: '',
        component: ErrorComponent
    }
];

@NgModule({
    declarations: [
        ErrorComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatIconModule,
        FlexLayoutModule
    ]
})
export class ErrorModule {
}
