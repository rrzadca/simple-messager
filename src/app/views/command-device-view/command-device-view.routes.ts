import { Route } from '@angular/router';
import { CommandDeviceViewComponent } from './command-device-view.component';

export const routes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: CommandDeviceViewComponent,
    },
];
