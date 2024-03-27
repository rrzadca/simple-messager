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
    protected messages$$ = signal<ChatMessage[]>([]);
    protected commandMode$$ = signal<boolean>(false);

    protected form: FormGroup<ChatForm> | undefined;

    @Input() set commandMode(value: boolean) {
        this.commandMode$$.set(value);
    }
    @Input() set messages(value: ChatMessage[]) {
        this.messages$$.set(value);
    }

    @Output() onSendMessage = new EventEmitter<string>();

    constructor() {}

    ngOnInit() {
        this.initForm();
    }

    protected handleSubmit() {
        if (this.form?.value.message) {
            this.onSendMessage.emit(this.form.value.message);

            this.form.patchValue({ message: '' });
        }
    }

    private initForm(): void {
        this.form = new FormGroup<ChatForm>({
            message: new FormControl<string>('', { nonNullable: true }),
        });
    }
}
