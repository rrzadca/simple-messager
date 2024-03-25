import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'sm-field-device-view',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './field-device-view.component.html',
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldDeviceViewComponent {}
