import { MessageInterface } from '../interfaces/message.interface';
import { MessageChannelEnum } from '../types/message-channel.enum';

export function Message(name: string, channel: MessageChannelEnum = MessageChannelEnum.base) {
    return function <T extends { new(...args: any[]): MessageInterface }>(constructor: T) {
        constructor.prototype.name = name;
        (<any>constructor).channel = channel;
        constructor.prototype.channel = channel;
    };
}
