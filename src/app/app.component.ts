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

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, ButtonComponent],
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
export class AppComponent {
    private readonly themeService = inject(ThemeService);

    protected themeButtonLabel$$ = computed(() => {
        return this.themeService.isDarkTheme$$() ? 'Light mode' : 'Dark mode';
    });

    protected toggleTheme() {
        this.themeService.toggleTheme();
    }
}
