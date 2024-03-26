import { Pipe, PipeTransform } from '@angular/core';
import { DeviceType } from '../../api/models/device-type';

@Pipe({
    name: 'smDeviceType',
    standalone: true,
})
export class DeviceTypePipe implements PipeTransform {
    transform(value: DeviceType | null): string | null {
        if (!value) {
            return null;
        }

        switch (value) {
            case DeviceType.FIELD:
                return 'Field Device';
            case DeviceType.COMMAND:
                return 'Command Device';
            default:
                return value;
        }
    }
}
