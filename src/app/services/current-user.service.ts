import { StatefulClass } from '../core/stateful-class';
import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/services/api.service';
import { DeviceType } from '../api/models/device-type';
import { Router } from '@angular/router';

export interface CurrentUserServiceState {
    username: string | null;
    joinedAt: Date | null;
    deviceId: string | null;
}

@Injectable({
    providedIn: 'root',
})
export class CurrentUserService extends StatefulClass<CurrentUserServiceState> {
    private readonly apiService = inject(ApiService);
    private readonly router = inject(Router);

    constructor() {
        super();

        this.createState({
            username: null,
            joinedAt: null,
            deviceId: null,
        });
    }

    login(username: string, deviceType: DeviceType, deviceName: string): void {
        this.apiService
            .registerDevice(username, deviceType, deviceName)
            .subscribe((deviceId) => {
                this.setState({
                    username,
                    joinedAt: new Date(),
                    deviceId,
                });
            });
    }

    logout(): void {
        if (this.state.deviceId) {
            this.apiService.unregisterDevice(this.state.deviceId).subscribe();
        }

        this.setState({
            username: null,
            joinedAt: null,
            deviceId: null,
        });

        this.router.navigateByUrl('/');
    }
}
