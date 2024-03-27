import { InjectionToken } from '@angular/core';
import { ChatMessage } from '../models/chat-message.model';

export const CHAT_MESSAGE_MAPPER_SERVICE =
    new InjectionToken<ChatMessageMapperService>('CHAT_MESSAGE_MAPPER_SERVICE');

export abstract class ChatMessageMapperService {
    public abstract mapToChatMessage(message: any): ChatMessage;
}
