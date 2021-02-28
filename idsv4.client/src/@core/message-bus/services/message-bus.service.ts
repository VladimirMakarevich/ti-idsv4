import { Injectable, isDevMode, Type } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MessageInterface } from '../interfaces/message.interface';
import { MessageChannelEnum } from '../types/message-channel.enum';

@Injectable({
    providedIn: 'root'
})
export class MessageBusService {

    private baseChannel = new Subject<any & MessageInterface>();
    private stackChannel = new BehaviorSubject<any & MessageInterface>(null);

    public send(message: MessageInterface): void {
        if (isDevMode()) {
            console.log('MessageBusService >>> ', message);
        }

        if (message.channel === MessageChannelEnum.base) {
            this.baseChannel.next(message);
        } else if (message.channel === MessageChannelEnum.stack) {
            this.stackChannel.next(message);
        } else {
            throw new Error(`MessageBusService: Unknown bus channel ${message.channel}`);
        }
    }

    public of<T>(messageType: Type<T & MessageInterface>): Observable<T & MessageInterface> {
        const channel = (<any> messageType).channel;
        let bus: Subject<any & MessageInterface>;

        if (channel === MessageChannelEnum.base) {
            bus = this.baseChannel;
        } else if (channel === MessageChannelEnum.stack) {
            bus = this.stackChannel;
        } else {
            throw new Error(`MessageBusService: Unknown bus channel ${channel}`);
        }

        return bus.pipe(
            map((message: T & MessageInterface) => (<T> message)),
            filter((message: T & MessageInterface | null) => Boolean(message)),
            filter((message: T & MessageInterface) => message.name === messageType.prototype.name)
        );
    }

    public dispose(): void {
        this.baseChannel.complete();
        this.stackChannel.complete();
    }

}
