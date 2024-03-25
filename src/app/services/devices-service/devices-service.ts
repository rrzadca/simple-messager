import { Injectable } from '@angular/core';
import { StatefulClass } from '../../core/stateful-class';
import { Device } from './models/device-type';

export interface DevicesServiceState {
    devices: Device[];
}

@Injectable({ providedIn: 'root' })
export class DevicesService extends StatefulClass<DevicesServiceState> {
    constructor() {
        super();

        this.createState({ devices: [] });
    }
}
