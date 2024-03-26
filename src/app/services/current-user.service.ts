import { StatefulClass } from '../core/stateful-class';
import { inject, Injectable } from '@angular/core';
import { DevicesService } from './devices-service/devices-service';
import { Device, DeviceType } from './devices-service/models/device-type';

export interface CurrentUserServiceState {
    username: string | null;
    joinedAt: Date | null;
    device: Device | null;
}

@Injectable({
    providedIn: 'root',
})
export class CurrentUserService extends StatefulClass<CurrentUserServiceState> {
    private readonly devicesService = inject(DevicesService);

    constructor() {
        super();

        this.createState({
            username: null,
            joinedAt: null,
            device: null,
        });
    }

    login(username: string, deviceName: string, deviceType: DeviceType): void {
        this.setState({
            username,
            joinedAt: new Date(),
        });

        this.devicesService.registerDevice(deviceName, deviceType);
    }

    logout(): void {
        this.setState({
            username: null,
            joinedAt: null,
        });
    }
}
