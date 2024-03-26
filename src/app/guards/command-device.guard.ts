import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';
import { ApiService } from '../api/services/api.service';
import { DeviceType } from '../api/models/device-type';
import { CurrentUserService } from '../services/current-user.service';

@Injectable({ providedIn: 'root' })
export class CommandDeviceGuard {
    private readonly router = inject(Router);
    private readonly notificationsService = inject(NotificationsService);
    private readonly apiService = inject(ApiService);
    private readonly currentUserService = inject(CurrentUserService);

    canLoginToCommandDevice = ():
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> => {
        if (
            this.apiService.state.devices.some(
                (device) =>
                    device.type === DeviceType.COMMAND &&
                    device.username !== this.currentUserService.state.username,
            )
        ) {
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
