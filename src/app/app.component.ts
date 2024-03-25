import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { ThemeService } from './services/theme.service';
import { NotificationsPortalComponent } from './components/notifications-portal/notifications-portal.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        ButtonComponent,
        NotificationsPortalComponent,
        TopBarComponent,
    ],
    templateUrl: './app.component.html',
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
