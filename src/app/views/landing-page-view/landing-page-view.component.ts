import { Component } from '@angular/core';

@Component({
    selector: 'sm-landing-page-view',
    templateUrl: './landing-page-view.component.html',
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
    standalone: true,
    imports: [],
})
export class LandingPageViewComponent {}
