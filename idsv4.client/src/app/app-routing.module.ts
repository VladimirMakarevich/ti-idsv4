import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountRouter } from '../@core/routing/routers/account.router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./pages/home/home.module').then(m => m.HomeModule),
    },
    {
        path: AccountRouter.auth,
        loadChildren: () =>
            import('./auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: AccountRouter.signUp,
        loadChildren: () =>
            import('./pages/register/register.module').then(m => m.RegisterModule),
    },
    {
        path: AccountRouter.signIn,
        loadChildren: () =>
            import('./pages/login/login.module').then(m => m.LoginModule),
    },
    {
        path: AccountRouter.mailConfirm,
        loadChildren: () =>
            import('./pages/mail-confirm/mail-confirm.module').then(m => m.MailConfirmModule),
    },
    {
        path: AccountRouter.error,
        loadChildren: () =>
            import('./pages/error/error.module').then(m => m.ErrorModule),
    },
    {
        path: AccountRouter.notFound,
        loadChildren: () =>
            import('./pages/not-found/not-found.module').then(m => m.NotFoundModule),
    },
    {
        path: '**',
        loadChildren: () =>
            import('./pages/not-found/not-found.module').then(m => m.NotFoundModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
