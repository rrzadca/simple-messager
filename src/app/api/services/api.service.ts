import { Device, DeviceType, FieldDevice } from '../models/device-type';
import { Message } from '../models/message.model';
import { v4 as uuidv4 } from 'uuid';
import { StatefulClass } from '../../core/stateful-class';
import { interval, Observable, of, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

interface ApiServiceState {
    devices: Device[];
}

@Injectable({ providedIn: 'root' })
export class ApiService extends StatefulClass<ApiServiceState> {
    private deviceRegisteredSubject$ = new Subject<Device>();
    private deviceUnregisteredSubject$ = new Subject<string>();
    private messageSentSubject$ = new Subject<Message>();

    constructor() {
        super();

        this.createState({
            devices: [],
        });

        this.enableDebug();

        this.sendFakeMessages();
    }

    get deviceRegistered$(): Observable<Device> {
        return this.deviceRegisteredSubject$.asObservable();
    }

    get deviceUnregistered$(): Observable<string> {
        return this.deviceUnregisteredSubject$.asObservable();
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

        this.deviceRegisteredSubject$.next(newDevice);

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

        this.messageSentSubject$.next({
            device: device,
            text: message,
            username: device.username,
            sentAt: new Date(),
        });

        return of();
    }

    muteDevice(id: string, mute: boolean): Observable<string> {
        const device: FieldDevice | undefined = this.state.devices.find(
            (device) => device.id === id && device.type === DeviceType.FIELD,
        ) as FieldDevice | undefined;

        if (!device) {
            throw new Error('Device not found');
        }

        device.isMuted = mute;

        this.setState({
            devices: [
                ...this.state.devices.filter((device) => device.id === id),
                device,
            ],
        });

        return of(device.id);
    }

    private sendFakeMessages(): void {
        let counter = 1;

        interval(10000).subscribe(() => {
            this.messageSentSubject$.next({
                device: {
                    id: `fake-id-${counter}`,
                    username: `fake-username-${counter}`,
                    name: `fake-device-${counter}`,
                    type: DeviceType.FIELD,
                    joinedAt: new Date(),
                },
                text: `fake-message-${counter}`,
                username: `fake-username-${counter}`,
                sentAt: new Date(),
            });
            counter++;
        });
    }
}
