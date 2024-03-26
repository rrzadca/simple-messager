import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    EventEmitter,
    Inject,
    inject,
    InjectionToken,
    Input,
    OnInit,
    Output,
    signal,
} from '@angular/core';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { InputTextComponent } from '../../../form/inputs/input-text/input-text.component';
import { ButtonComponent } from '../../../button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../../api/services/api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrentUserService } from '../../../../services/current-user.service';
import { map } from 'rxjs';
import { DeviceType } from '../../../../api/models/device-type';
import {
    CHAT_MESSAGE_MAPPER_SERVICE,
    ChatMessageMapperService,
} from '../../services/chat-message-mapper.service';
import { ChatMessage } from '../../models/chat-message.model';

interface ChatForm {
    message: FormControl<string>;
}

@Component({
    selector: 'sm-chat',
    standalone: true,
    imports: [
        ChatMessageComponent,
        InputTextComponent,
        ButtonComponent,
        ReactiveFormsModule,
    ],
    templateUrl: './chat.component.html',
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit {
    private readonly apiService = inject(ApiService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly currentUserService = inject(CurrentUserService);

    protected messages$$ = signal<ChatMessage[]>([]);
    protected adminMode$$ = signal<boolean>(false);

    protected form: FormGroup<ChatForm> | undefined;

    @Input() set adminMode(value: boolean) {
        this.adminMode$$.set(value);
    }

    @Output() onSendMessage = new EventEmitter<string>();

    constructor(
        @Inject(CHAT_MESSAGE_MAPPER_SERVICE)
        private readonly chatMessageMapperService: ChatMessageMapperService,
    ) {}

    ngOnInit() {
        this.initForm();
        this.listenForMessages();
    }

    protected handleSubmit() {
        if (
            this.form?.value.message &&
            this.currentUserService.state.deviceId
        ) {
            this.apiService
                .sendMessage(
                    this.currentUserService.state.deviceId,
                    this.form.value.message,
                )
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe();

            this.form.patchValue({ message: '' });
        }
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

    private initForm(): void {
        this.form = new FormGroup<ChatForm>({
            message: new FormControl<string>('', { nonNullable: true }),
        });
    }
}
