import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../../constants/endpoints';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../app/initialize/services/config.service';
import { HttpApiService } from '../http-api.service';

@Injectable({
    providedIn: 'root'
})
export class CdnService extends HttpApiService {

    public constructor(
        protected http: HttpClient,
        protected config: ConfigService,
        private endpoints: Endpoints,
    ) {
        super(http, config);
    }

    public getImage = (fileInfoToken: string): Observable<Blob> => {
        return this.get(this.endpoints.cdn.getImage + fileInfoToken,
            {responseType: 'blob'}
        );
    };

    public uploadFile = (file: any): Observable<any> => {
        return this.post(this.endpoints.cdn.uploadFile, file);
    };

    public getFullApiUrl(url: string): string {
        return this.config.settings.cdnUrl + url;
    }

}
