import { Route } from '@angular/router';
import { LandingPageViewComponent } from './landing-page-view.component';

export const routes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: LandingPageViewComponent,
    },
];
