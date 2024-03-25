import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'sm-command-device-view',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './command-device-view.component.html',
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
})
export class CommandDeviceViewComponent {}
