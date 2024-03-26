import { ChatMessageMapperService } from './chat-message-mapper.service';
import { Injectable } from '@angular/core';
import { DeviceType } from '../../../api/models/device-type';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({ providedIn: 'root' })
export class ApiChatMessageMapperService extends ChatMessageMapperService {
    public override mapToChatMessage(message: any): ChatMessage {
        return {
            message: message.text,
            username: message.username,
            deviceName:
                message.device.type === DeviceType.FIELD
                    ? message.device.name
                    : 'Command device',
            sendAt: message.sentAt,
        };
    }
}
