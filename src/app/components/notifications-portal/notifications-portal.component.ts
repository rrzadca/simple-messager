import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';

@Component({
    selector: 'sm-notifications-portal',
    standalone: true,
    imports: [],
    templateUrl: './notifications-portal.component.html',
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsPortalComponent {
    protected readonly notificationsService = inject(NotificationsService);
}
