import { AccountRouter } from '../../../@core/routing/routers/account.router';
import { ReturnUrlType } from '../../pages/oidc.component';

export const QueryParameterNames = {
    ReturnUrl: ReturnUrlType,
    Message: 'message'
};

let applicationPaths: ApplicationPathsType = {
    ApiAuthorizationClientConfigurationUrl: `/api/config`,
    Login: `${ AccountRouter.auth }/${ AccountRouter.oidc }/${ AccountRouter.signIn }`,
    LoginFailed: `${ AccountRouter.auth }/${ AccountRouter.oidc }/${ AccountRouter.signInFailed }`,
    LoginCallback: `${ AccountRouter.auth }/${ AccountRouter.oidc }/${ AccountRouter.signInCallback }`,
    LogOut: `${ AccountRouter.auth }/${ AccountRouter.oidc }/${ AccountRouter.signOut }`,
    LogOutCallback: `${ AccountRouter.auth }/${ AccountRouter.oidc }/${ AccountRouter.signOutCallback }`,
    DefaultLoginRedirectPath: '/',
    LoginFailedPathComponents: [],
    LoginPathComponents: [],
};

applicationPaths = {
    ...applicationPaths,
    LoginFailedPathComponents: applicationPaths.LoginFailed.split('/'),
    LoginPathComponents: applicationPaths.Login.split('/')
};

interface ApplicationPathsType {
    readonly ApiAuthorizationClientConfigurationUrl: string;
    readonly Login: string;
    readonly LoginFailed: string;
    readonly LoginCallback: string;
    readonly LogOut: string;
    readonly LogOutCallback: string;
    readonly DefaultLoginRedirectPath: string;
    readonly LoginFailedPathComponents: string [];
    readonly LoginPathComponents: string [];
}
