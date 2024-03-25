import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
    notificationMessage$$ = signal<string | null>(null);

    showNotification(message: string): void {
        this.notificationMessage$$.set(message);

        setTimeout(() => {
            this.notificationMessage$$.set(null);
        }, 5000);
    }
}
