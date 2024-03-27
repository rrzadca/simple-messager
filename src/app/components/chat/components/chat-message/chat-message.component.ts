import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ChatMessage } from '../../models/chat-message.model';
import { BadgeComponent } from '../../../badge/badge.component';

@Component({
    selector: 'sm-chat-message',
    standalone: true,
    imports: [CommonModule, DatePipe, BadgeComponent],
    templateUrl: './chat-message.component.html',
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
    @Input({ required: true }) message: ChatMessage | null = null;
    @Input() adminMode = false;
}
