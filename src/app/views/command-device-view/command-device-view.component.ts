import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    Inject,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ChatComponent } from '../../components/chat/components/chat/chat.component';
import { TableComponent } from '../../components/table/components/table/table.component';
import { ApiService } from '../../api/services/api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Device, DeviceType } from '../../api/models/device-type';
import { TableColumn } from '../../components/table/models/table-column.model';
import { TableRowOption } from '../../components/table/models/table-row-option.model';
import { DeviceTypePipe } from '../../pipes/device-type/device-type.pipe';
import { InputTextComponent } from '../../components/form/inputs/input-text/input-text.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { KeywordsGuardComponent } from './components/keywords-guard/keywords-guard.component';
import { ToastrService } from 'ngx-toastr';
import { CardComponent } from '../../components/card/card.component';
import { CurrentUserService } from '../../services/current-user.service';
import { map } from 'rxjs';
import {
    CHAT_MESSAGE_MAPPER_SERVICE,
    ChatMessageMapperService,
} from '../../components/chat/services/chat-message-mapper.service';
import { ChatMessage } from '../../components/chat/models/chat-message.model';

interface DeviceRowItem {
    id: string;
    username: string;
    name: string;
    type: string;
    joinedAt: string;
    isMuted: boolean;
}

@Component({
    selector: 'sm-command-device-view',
    standalone: true,
    imports: [
        CommonModule,
        ChatComponent,
        TableComponent,
        InputTextComponent,
        FormsModule,
        ButtonComponent,
        KeywordsGuardComponent,
        CardComponent,
    ],
    providers: [DatePipe, DeviceTypePipe],
    templateUrl: './command-device-view.component.html',
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandDeviceViewComponent implements OnInit {
    private readonly destroyRef = inject(DestroyRef);
    private readonly apiService = inject(ApiService);
    private readonly deviceTypePipe = inject(DeviceTypePipe);
    private readonly datePipe = inject(DatePipe);
    private readonly toastrService = inject(ToastrService);
    private readonly currentUserService = inject(CurrentUserService);

    protected devices$$ = signal<DeviceRowItem[]>([]);
    protected messages$$ = signal<ChatMessage[]>([]);

    protected tableColumns: TableColumn[] = [];
    protected tableRowOptions: TableRowOption[] = [];

    constructor(
        @Inject(CHAT_MESSAGE_MAPPER_SERVICE)
        private readonly chatMessageMapperService: ChatMessageMapperService,
    ) {}

    ngOnInit() {
        this.initTableColumns();
        this.initTableRowOptions();

        this.fetchDevices();
        this.listenForDevicesChange();
        this.listenForMessages();
    }

    protected handleMessageSend(message: string) {
        if (this.currentUserService.state.deviceId)
            this.apiService
                .sendMessage(this.currentUserService.state.deviceId, message)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe();
    }

    private listenForDevicesChange(): void {
        this.apiService
            .observeStateChange('devices')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((devices) => {
                this.devices$$.set(
                    devices.map((device) => this.mapToDeviceRowItem(device)),
                );
            });
    }

    private initTableColumns(): void {
        this.tableColumns = [
            { fieldName: 'username', label: 'Username' },
            { fieldName: 'name', label: 'Name' },
            { fieldName: 'type', label: 'Type' },
            { fieldName: 'joinedAt', label: 'Joined At' },
        ];
    }

    private initTableRowOptions(): void {
        this.tableRowOptions = [
            {
                label: 'Mute',
                action: (device: DeviceRowItem) => {
                    this.muteDevice(device.id, true);
                },
                isVisible: (device) => {
                    return !device.isMuted && device.type === 'Field Device';
                },
            },
            {
                label: 'Unmute',
                action: (device: DeviceRowItem) => {
                    this.muteDevice(device.id, false);
                },
                isVisible: (device) => {
                    return device.isMuted && device.type === 'Field Device';
                },
            },
        ];
    }

    private fetchDevices(): void {
        this.devices$$.set(
            this.apiService.state.devices.map((device) =>
                this.mapToDeviceRowItem(device),
            ),
        );
    }

    private mapToDeviceRowItem(device: Device): DeviceRowItem {
        return {
            id: device.id,
            username: device.username ?? '',
            name:
                device.type === DeviceType.FIELD
                    ? device.name
                    : 'Command Device',
            type: this.deviceTypePipe.transform(device.type) ?? '',
            joinedAt:
                this.datePipe.transform(
                    device.joinedAt,
                    'dd.MM.yyyy HH:mm',
                    'UTC',
                ) ?? '',
            isMuted:
                device.type === DeviceType.FIELD ? !!device.isMuted : false,
        };
    }

    private muteDevice(deviceId: string, mute: boolean): void {
        this.apiService
            .muteDevice(deviceId, mute)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.toastrService.info(
                    `Device has been ${mute ? 'muted' : 'unmuted'}`,
                    undefined,
                    { timeOut: 4000, enableHtml: true },
                );
            });
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
