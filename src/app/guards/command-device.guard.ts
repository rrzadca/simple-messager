import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { DevicesService } from '../services/devices-service/devices-service';
import { NotificationsService } from '../services/notifications.service';

@Injectable({ providedIn: 'root' })
export class CommandDeviceGuard {
    private readonly router = inject(Router);
    private readonly notificationsService = inject(NotificationsService);
    private readonly devicesService = inject(DevicesService);

    canLoginToCommandDevice = ():
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> => {
        console.log(` ;; this.devicesService.state`, this.devicesService.state);
        if (
            !this.devicesService.state.devices.some(
                (device) => device.type === 'COMMAND',
            )
        ) {
            console.log(` ;; show`);
            this.notificationsService.showNotification(
                'Command device is already in use',
            );
            this.router.navigateByUrl('/');
        }
        return true;
    };

    canActivate: CanActivateFn = this.canLoginToCommandDevice;
    canMatch: CanMatchFn = this.canLoginToCommandDevice;
}
