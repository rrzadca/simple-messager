import { Device, DeviceType, FieldDevice } from '../models/device-type';
import { Message } from '../models/message.model';
import { v4 as uuidv4 } from 'uuid';
import { StatefulClass } from '../../core/stateful-class';
import { Observable, Subject } from 'rxjs';

interface ApiServiceState {
    devices: Device[];
}

export class ApiService extends StatefulClass<ApiServiceState> {
    private deviceRegisteredSubject$ = new Subject<Device>();
    private deviceUnregisteredSubject$ = new Subject<string>();
    private messageSentSubject$ = new Subject<Message>();

    constructor() {
        super();

        this.createState({
            devices: [],
        });
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

    registerDevice(username: string, type: DeviceType): string {
        const newDevice: Device = {
            id: uuidv4(),
            type,
            joinedAt: new Date(),
            username: username,
            isMuted: false,
        };

        this.setState({
            devices: [...this.state.devices, newDevice],
        });

        this.deviceRegisteredSubject$.next(newDevice);

        return newDevice.id;
    }

    unregisterDevice(deviceId: string): void {
        if (!this.state.devices.some((device) => device.id === deviceId)) {
            throw new Error('Device not found');
        }

        this.setState({
            devices: [
                ...this.state.devices.filter(
                    (device) => device.id === deviceId,
                ),
            ],
        });
    }

    sendMessage(deviceId: string, message: string) {
        const device = this.state.devices.find(
            (device) => device.id === deviceId,
        );

        if (!device) {
            throw new Error('Device not found');
        }

        this.messageSentSubject$.next({
            deviceId: device.id,
            text: message,
            username: device.username,
            sentAt: new Date(),
        });
    }

    muteDevice(id: string, mute: boolean): string {
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

        return device.id;
    }
}
