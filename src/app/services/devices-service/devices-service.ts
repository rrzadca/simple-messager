import { inject, Injectable } from '@angular/core';
import { StatefulClass } from '../../core/stateful-class';
import { Device, DeviceType } from './models/device-type';
import { v4 as uuidv4 } from 'uuid';
import { CurrentUserService } from '../current-user.service';

export interface DevicesServiceState {
    devices: Device[];
}

@Injectable({ providedIn: 'root' })
export class DevicesService extends StatefulClass<DevicesServiceState> {
    private readonly currentUserService = inject(CurrentUserService);
    constructor() {
        super();

        this.createState({ devices: [] });
    }

    addDevice(name: string, type: DeviceType): void {
        this.setState({
            devices: [
                ...this.state.devices,
                {
                    name,
                    type,
                    joinedAt: new Date(),
                    id: uuidv4(),
                    username: this.currentUserService.state.username ?? '',
                },
            ],
        });
    }
}
