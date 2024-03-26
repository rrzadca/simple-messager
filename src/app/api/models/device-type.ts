export enum DeviceType {
    FIELD = 'FIELD',
    COMMAND = 'COMMAND',
}

export interface DeviceBase {
    id: string;
    type: DeviceType;
    joinedAt?: Date;
    username?: string;
}

export interface FieldDevice extends DeviceBase {
    type: DeviceType.FIELD;
    name: string;
    isMuted?: boolean;
}

export interface CommandDevice extends DeviceBase {
    type: DeviceType.COMMAND;
}

export type Device = FieldDevice | CommandDevice;
