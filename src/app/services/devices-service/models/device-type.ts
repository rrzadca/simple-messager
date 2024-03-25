export type DeviceType = 'FIELD' | 'COMMAND';

export interface DeviceBase {
    type: DeviceType;
    joinedAt: Date;
}

export interface FieldDevice extends DeviceBase {
    type: 'FIELD';
    id: string;
    username: string;
}

export interface CommandDevice extends DeviceBase {
    type: 'COMMAND';
}

export type Device = FieldDevice | CommandDevice;
