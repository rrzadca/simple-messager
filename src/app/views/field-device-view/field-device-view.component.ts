import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    Inject,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../../components/chat/components/chat/chat.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../../api/services/api.service';
import { CurrentUserService } from '../../services/current-user.service';
import { map } from 'rxjs';
import {
    CHAT_MESSAGE_MAPPER_SERVICE,
    ChatMessageMapperService,
} from '../../components/chat/services/chat-message-mapper.service';
import { ChatMessage } from '../../components/chat/models/chat-message.model';

@Component({
    selector: 'sm-field-device-view',
    standalone: true,
    imports: [CommonModule, ChatComponent],
    templateUrl: './field-device-view.component.html',
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldDeviceViewComponent implements OnInit {
    private readonly destroyRef = inject(DestroyRef);
    private readonly apiService = inject(ApiService);
    private readonly currentUserService = inject(CurrentUserService);

    protected messages$$ = signal<ChatMessage[]>([]);

    constructor(
        @Inject(CHAT_MESSAGE_MAPPER_SERVICE)
        private readonly chatMessageMapperService: ChatMessageMapperService,
    ) {}

    ngOnInit(): void {
        this.listenForMessages();
    }

    protected handleMessageSend(message: string) {
        if (this.currentUserService.state.deviceId)
            this.apiService
                .sendMessage(this.currentUserService.state.deviceId, message)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe();
    }

    private listenForMessages(): void {
        this.apiService.messageSent$
            .pipe(
                map((message) =>
                    this.chatMessageMapperService.mapToChatMessage(message),
                ),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe((message) => {
                this.messages$$.set([...this.messages$$(), message]);
            });
    }
}
