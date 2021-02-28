import { SettingsModel } from '../../../@core/models/settings/settings.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Endpoints } from '../../../@core/constants/endpoints';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    public settings: SettingsModel;

    public constructor(
        private http: HttpClient,
        private endpoints: Endpoints
    ) {
    }

    public initialize(): Observable<any> {
        return this.http.get(this.endpoints.config.configUrl).pipe(
            tap(this.setConfig)
        );
    }

    private setConfig = (settings: SettingsModel): void => {
        this.settings = settings;
    }

}
