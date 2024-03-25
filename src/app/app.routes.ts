import { Routes } from '@angular/router';
import { CommandDeviceGuard } from './guards/command-device.guard';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                loadChildren: () =>
                    import(
                        './views/landing-page-view/landing-page-view.routes'
                    ).then((r) => r.routes),
            },
            {
                path: 'field-device',
                loadChildren: () =>
                    import(
                        './views/field-device-view/field-device-view.routes'
                    ).then((r) => r.routes),
            },
            {
                path: 'command-device',
                canMatch: [CommandDeviceGuard],
                loadChildren: () =>
                    import(
                        './views/command-device-view/command-device-view.routes'
                    ).then((r) => r.routes),
            },
        ],
    },
];
