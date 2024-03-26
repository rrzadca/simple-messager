import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/services/api.service';
import { DeviceType } from '../api/models/device-type';
import { CurrentUserService } from '../services/current-user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class CommandDeviceGuard {
    private readonly router = inject(Router);
    private readonly apiService = inject(ApiService);
    private readonly currentUserService = inject(CurrentUserService);
    private readonly toastrService = inject(ToastrService);

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
            this.toastrService.error(
                'Command device is already in use',
                undefined,
                { timeOut: 4000 },
            );
            this.router.navigateByUrl('/');
        }
        return true;
    };

    canActivate: CanActivateFn = this.canLoginToCommandDevice;
    canMatch: CanMatchFn = this.canLoginToCommandDevice;
}
