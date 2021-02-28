import { AccountRouter } from './routers/account.router';
import { HomeRouter } from './routers/home.router';

export class Routing {
    public static get account(): AccountRouter {
        return new AccountRouter();
    }

    public static get home(): HomeRouter {
        return new HomeRouter();
    }

}
