import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../../components/chat/components/chat/chat.component';

@Component({
    selector: 'sm-command-device-view',
    standalone: true,
    imports: [CommonModule, ChatComponent],
    templateUrl: './command-device-view.component.html',
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandDeviceViewComponent {}
