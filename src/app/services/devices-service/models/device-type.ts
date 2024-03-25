export type DeviceType = 'FIELD' | 'COMMAND';

export interface DeviceBase {
    type: DeviceType;
    joinedAt: Date;
    name: string;
    username: string;
}

export interface FieldDevice extends DeviceBase {
    type: 'FIELD';
    id: string;
}

export interface CommandDevice extends DeviceBase {
    type: 'COMMAND';
}

export type Device = FieldDevice | CommandDevice;
