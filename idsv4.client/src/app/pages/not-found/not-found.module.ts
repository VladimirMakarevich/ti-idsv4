import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes = [
    {
        path: '',
        component: NotFoundComponent
    }
];

@NgModule({
    declarations: [
        NotFoundComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        FlexLayoutModule
    ]
})
export class NotFoundModule {
}
