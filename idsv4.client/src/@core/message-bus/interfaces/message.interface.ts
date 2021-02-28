import { MessageChannelEnum } from '../types/message-channel.enum';

export interface MessageInterface {
    readonly name: string;
    readonly channel: MessageChannelEnum;

}
