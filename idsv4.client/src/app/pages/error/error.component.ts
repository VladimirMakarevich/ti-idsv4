import { Component, ViewEncapsulation } from '@angular/core';
import { appAnimations } from '../../../@examine/animations';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: appAnimations
})
export class ErrorComponent {

}
