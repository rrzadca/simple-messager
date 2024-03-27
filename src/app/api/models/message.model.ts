import { Device } from './device-type';

export interface Message {
    text: string;
    username: string;
    device: Device;
    sentAt: Date;
}
