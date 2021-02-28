import { Injectable, Injector, isDevMode } from '@angular/core';
import { AccountService } from './identity/account.service';
import { CdnService } from './identity/cdn.service';

@Injectable({
    providedIn: 'root'
})
export class FacadeService {

    private _account: AccountService;
    private _cdn: CdnService;

    public constructor(
        private injector: Injector) {
    }

    public get cdn(): CdnService {
        if (!this._cdn) {
            this.writeConsole('_cdnService');
            this._cdn = this.injector.get(CdnService);
        }

        return this._cdn;
    }

    public get account(): AccountService {
        if (!this._account) {
            this.writeConsole('_accountService');
            this._account = this.injector.get(AccountService);
        }

        return this._account;
    }

    private writeConsole(message: string): void {
        if (isDevMode()) {
            console.log('__init__ >>> ', message);
        }
    }

}
