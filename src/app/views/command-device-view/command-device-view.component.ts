import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
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
import { CardComponent } from '../../card/card.component';

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

    protected devices$$ = signal<DeviceRowItem[]>([]);

    protected tableColumns: TableColumn[] = [];
    protected tableRowOptions: TableRowOption[] = [];
    protected keyword: string | null = null;

    ngOnInit() {
        this.initTableColumns();
        this.initTableRowOptions();

        this.devices$$.set(
            this.apiService.state.devices.map((device) =>
                this.mapToDeviceRowItem(device),
            ),
        );
        this.listenForDevicesChange();
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
                    return !device.isMuted;
                },
            },
            {
                label: 'Unmute',
                action: (device: DeviceRowItem) => {
                    this.muteDevice(device.id, false);
                },
                isVisible: (device) => {
                    return device.isMuted;
                },
            },
        ];
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
        this.apiService.muteDevice(deviceId, mute);
    }

    handleAddKeyword() {}
}
