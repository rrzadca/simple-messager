import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChatMessage } from '../../models/chat-message.model';

@Component({
    selector: 'sm-chat-message',
    standalone: true,
    imports: [DatePipe],
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
