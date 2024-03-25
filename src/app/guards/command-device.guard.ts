import { CanActivateFn, CanMatchFn, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { DevicesService } from '../services/devices-service/devices-service';

@Injectable({ providedIn: 'root' })
export class CommandDeviceGuard {
    private readonly devicesService = inject(DevicesService);

    canLoginToCommandDevice = ():
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> => {
        return !this.devicesService.state.devices.some(
            (device) => device.type === 'COMMAND',
        );
    };

    canActivate: CanActivateFn = this.canLoginToCommandDevice;
    canMatch: CanMatchFn = this.canLoginToCommandDevice;
}
