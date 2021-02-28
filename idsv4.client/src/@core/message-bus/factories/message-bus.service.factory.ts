import { MessageBusService } from '../services/message-bus.service';
import { isDevMode } from '@angular/core';

let messageBus;

export function MessageBusServiceFactory(): MessageBusService {
    if (!messageBus) {
        if (isDevMode()) {
            console.log('>>>>>>>>>>>>>>> MessageBusService was created.')
        }

        messageBus = new MessageBusService();
    }

    return messageBus;
}
