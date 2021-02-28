import { Component } from '@angular/core';
import { DestroyableComponent } from '../@examine/components/destroyable.component';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends DestroyableComponent {

}
