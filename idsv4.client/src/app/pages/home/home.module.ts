import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes = [
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatIconModule,
        FlexLayoutModule
    ]
})
export class HomeModule {
}
