export interface ChatMessage {
    message: string;
    username: string;
    deviceName: string;
    isFromCommandDevice: boolean;
    sendAt: Date;
}
