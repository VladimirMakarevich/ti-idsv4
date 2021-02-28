import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountRouter } from '../../@core/routing/routers/account.router';
import { SignInOidcComponent } from './components/oidc-interaction/sign-in/sign-in-oidc.component';
import { OidcComponentLayout } from './components/oidc-interaction/oidc.component';
import { SignOutOidcComponent } from './components/oidc-interaction/sign-out/sign-out-oidc.component';

const routes: Routes = [
    {
        path: AccountRouter.oidc,
        component: OidcComponentLayout,
        children: [
            {path: '', redirectTo: AccountRouter.signIn, pathMatch: 'full'},
            {path: AccountRouter.signIn, component: SignInOidcComponent},
            {path: AccountRouter.signInFailed, component: SignInOidcComponent},
            {path: AccountRouter.signInCallback, component: SignInOidcComponent},
            {path: AccountRouter.signOut, component: SignOutOidcComponent},
            {path: AccountRouter.signOutCallback, component: SignOutOidcComponent},
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule {
}
