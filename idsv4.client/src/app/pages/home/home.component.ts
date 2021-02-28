import { Component, ViewEncapsulation } from '@angular/core';
import { appAnimations } from '../../../@examine/animations';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: appAnimations
})
export class HomeComponent {

}
