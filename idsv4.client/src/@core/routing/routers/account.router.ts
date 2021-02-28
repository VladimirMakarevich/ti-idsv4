export class AccountRouter {

    public static signIn = 'sign-in';

    public static signInFailed = 'sign-in-failed';

    public static notFound = 'not-found';

    public static error = 'error';

    public static signUp = 'sign-up';

    public static signOut = 'sign-out';

    public static signOutCallback = 'sign-out-callback';

    public static signInCallback = 'sign-in-callback';

    public static auth = 'auth';

    public static oidc = 'oidc';

    public static failed = 'failed';

    public static mailConfirm = 'mail-confirm';

    public static resetPassword = 'reset-password';

    public static forgotPassword = 'forgot-password';

    public get forgotPasswordUrl(): Array<any> {
        return [
            '/',
            AccountRouter.auth,
            AccountRouter.forgotPassword
        ];
    }

    public get signInUrl(): Array<any> {
        return [
            '/',
            AccountRouter.auth,
            AccountRouter.oidc,
            AccountRouter.signIn
        ];
    }

    public get signUpUrl(): Array<any> {
        return [
            '/',
            AccountRouter.auth,
            AccountRouter.signUp
        ];
    }

    public get signOutUrl(): Array<any> {
        return [
            '/',
            AccountRouter.auth,
            AccountRouter.signOut
        ];
    }

    public get resetPasswordUrl(): Array<any> {
        return [
            '/',
            AccountRouter.resetPassword
        ];
    }

}
