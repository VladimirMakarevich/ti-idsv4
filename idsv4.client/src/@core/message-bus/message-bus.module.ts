import { NgModule } from '@angular/core';
import { MessageBusService } from './services/message-bus.service';
import { MessageBusServiceFactory } from './factories/message-bus.service.factory';

@NgModule({
    providers: [{
        provide: MessageBusService, useFactory: MessageBusServiceFactory
    }]
})
export class MessageBusModule {

    public constructor(
        private messageService: MessageBusService
    ) {
    }

}
