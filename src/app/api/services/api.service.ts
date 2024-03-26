import { Device, DeviceType, FieldDevice } from '../models/device-type';
import { Message } from '../models/message.model';
import { v4 as uuidv4 } from 'uuid';
import { StatefulClass } from '../../core/stateful-class';
import { interval, map, Observable, of, Subject, takeWhile } from 'rxjs';
import { Injectable } from '@angular/core';

interface ApiServiceState {
    devices: Device[];
}

@Injectable({ providedIn: 'root' })
export class ApiService extends StatefulClass<ApiServiceState> {
    private readonly devicesChangedSubject$ = new Subject<void>();
    private messageSentSubject$ = new Subject<Message>();

    constructor() {
        super();

        this.createState({
            devices: [],
        });

        this.joinFakeUsers();
        this.sendFakeMessages();
    }

    get devicesChanged$(): Observable<void> {
        return this.devicesChangedSubject$.asObservable();
    }

    get messageSent$(): Observable<Message> {
        return this.messageSentSubject$.asObservable();
    }

    registerDevice(
        username: string,
        type: DeviceType,
        deviceName: string,
    ): Observable<string> {
        const newDevice: Device = {
            id: uuidv4(),
            type,
            joinedAt: new Date(),
            username: username,
            isMuted: false,
            name: deviceName,
        };

        this.setState({
            devices: [...this.state.devices, newDevice],
        });

        this.devicesChangedSubject$.next();

        return of(newDevice.id);
    }

    unregisterDevice(deviceId: string): Observable<string> {
        if (!this.state.devices.some((device) => device.id === deviceId)) {
            throw new Error('Device not found');
        }

        this.setState({
            devices: [
                ...this.state.devices.filter(
                    (device) => device.id !== deviceId,
                ),
            ],
        });

        return of(deviceId);
    }

    sendMessage(deviceId: string, message: string): Observable<void> {
        const device = this.state.devices.find(
            (device) => device.id === deviceId,
        );

        if (!device) {
            throw new Error('Device not found');
        }

        if (device.type === DeviceType.FIELD && device.isMuted) {
            return of(void 0);
        }

        this.messageSentSubject$.next({
            device: device,
            text: message,
            username: device.username ?? '',
            sentAt: new Date(),
        });

        return of(void 0);
    }

    muteDevice(id: string, mute: boolean): Observable<string> {
        const copyOfDevices = [...this.state.devices];

        const device = copyOfDevices.find(
            (device) => device.id === id,
        ) as FieldDevice;
        device.isMuted = mute;

        this.setState({ devices: copyOfDevices });

        return of(id);
    }

    getAvailableDevices(): Observable<Device[]> {
        const takenDevicesIds = this.state.devices.map((device) => device.id);
        return of(availableDevices).pipe(
            map((devices) =>
                devices.filter(
                    (device) => !takenDevicesIds.includes(device.id),
                ),
            ),
        );
    }

    private sendFakeMessages(): void {
        let counter = 1;

        interval(6000).subscribe(() => {
            const randomDevice =
                this.state.devices[
                    Math.floor(Math.random() * this.state.devices.length)
                ];

            this.sendMessage(
                randomDevice.id,
                `Fake message ${counter}`,
            ).subscribe();
            counter++;
        });
    }

    private joinFakeUsers(): void {
        let counter = 0;
        interval(4000)
            .pipe(takeWhile(() => counter < 4))
            .subscribe(() => {
                this.registerDevice(
                    availableUsernames[counter],
                    availableDevices[counter].type,
                    (availableDevices[counter] as FieldDevice).name,
                ).subscribe();
                counter++;
            });
    }
}

const availableDevices: Device[] = [
    {
        id: 'iphone-1',
        type: DeviceType.FIELD,
        name: 'iPhone 1',
    },
    {
        id: 'iphone-2',
        type: DeviceType.FIELD,
        name: 'iPhone 2',
    },
    {
        id: 'ipad-1',
        type: DeviceType.FIELD,
        name: 'iPad 1',
    },
    {
        id: 'ipad-2',
        type: DeviceType.FIELD,
        name: 'iPad 2',
    },
    {
        id: 'command-device',
        type: DeviceType.COMMAND,
    },
];

const availableUsernames = [
    'John Wick',
    'James Bond',
    'Indiana Jones',
    'Bruce Wayne',
];
