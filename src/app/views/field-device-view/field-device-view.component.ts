import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../../components/chat/components/chat/chat.component';

@Component({
    selector: 'sm-field-device-view',
    standalone: true,
    imports: [CommonModule, ChatComponent],
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
