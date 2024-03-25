import { Component, inject, OnInit, signal } from '@angular/core';
import { DeviceCardComponent } from './components/device-card/device-card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';

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
    imports: [DeviceCardComponent, ButtonComponent],
})
export class LandingPageViewComponent implements OnInit {
    protected devices$$ = signal<DeviceItem[]>([]);

    private readonly router = inject(Router);
    private readonly activatedRoute = inject(ActivatedRoute);

    ngOnInit(): void {
        this.devices$$.set([
            { label: 'Field device', routerLink: '/field-device' },
            { label: 'Command device', routerLink: '/command-device' },
        ]);
    }

    navToDevice() {
        this.router.navigate(['field-device'], {
            relativeTo: this.activatedRoute,
        });
    }
}
