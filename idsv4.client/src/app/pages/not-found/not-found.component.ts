import { Component, ViewEncapsulation } from '@angular/core';
import { appAnimations } from '../../../@examine/animations';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: appAnimations
})
export class NotFoundComponent {

}
