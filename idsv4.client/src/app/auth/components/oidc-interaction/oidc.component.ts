import { DestroyableComponent } from '../../../../@examine/components/destroyable.component';
import { Component } from '@angular/core';

@Component({
    selector: 'app-oidc',
    template: `
        <router-outlet></router-outlet>`,
})
export class OidcComponentLayout extends DestroyableComponent {

}
