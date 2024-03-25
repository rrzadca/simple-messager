import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesService } from '../../services/devices-service/devices-service';

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
export class FieldDeviceViewComponent {
    private readonly devicesService = inject(DevicesService);

    constructor() {
        console.log(` ;; this.devicesService.state`, this.devicesService.state);
    }
}
