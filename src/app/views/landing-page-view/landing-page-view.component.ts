import { Component, OnInit, signal } from '@angular/core';
import { DeviceCardComponent } from './components/device-card/device-card.component';

interface DeviceItem {
    label: string;
    routerLink: string;
}

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
    imports: [DeviceCardComponent],
})
export class LandingPageViewComponent implements OnInit {
    protected devices$$ = signal<DeviceItem[]>([]);

    ngOnInit(): void {
        this.devices$$.set([
            { label: 'Field device', routerLink: '/field-device' },
            { label: 'Command device', routerLink: '/command-device' },
        ]);
    }
}
