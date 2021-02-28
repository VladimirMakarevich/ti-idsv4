import { DestroyableComponent } from '../../@examine/components/destroyable.component';
import { ActivatedRoute, Router } from '@angular/router';

export const ReturnUrlType = 'returnUrl';

export interface INavigationState {
    [ReturnUrlType]: string;
}

export class OidcComponent extends DestroyableComponent {

    private readonly DefaultLoginRedirectPath: string = '';

    public constructor(
        protected activatedRoute: ActivatedRoute,
        protected router: Router
    ) {
        super();
    }

    public async navigateToReturnUrl(returnUrl: string): Promise<void> {
        // It's important that we do a replace here so that we remove the callback uri with the
        // fragment containing the tokens from the browser history.
        await this.router.navigateByUrl(returnUrl, {
            replaceUrl: true
        });
    }

    public getReturnUrl(state?: INavigationState): string {
        const fromQuery = (this.activatedRoute.snapshot.queryParams as INavigationState).returnUrl;
        return (state && state.returnUrl) ||
            fromQuery ||
            this.DefaultLoginRedirectPath;
    }

}