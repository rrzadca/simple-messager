import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import(
                        './views/landing-page-view/landing-page-view.routes'
                    ).then((r) => r.routes),
            },
        ],
    },
];
