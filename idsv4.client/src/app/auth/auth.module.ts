import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SignInOidcComponent } from './components/oidc-interaction/sign-in/sign-in-oidc.component';
import { AuthRoutingModule } from './auth-routing.module';
import { OidcComponentLayout } from './components/oidc-interaction/oidc.component';
import { SignOutOidcComponent } from './components/oidc-interaction/sign-out/sign-out-oidc.component';


@NgModule({
    imports: [
        AuthRoutingModule,
        CommonModule,
        HttpClientModule,
    ],
    declarations: [
        OidcComponentLayout,
        SignInOidcComponent,
        SignOutOidcComponent
    ],
    providers: []
})
export class AuthModule {
}
