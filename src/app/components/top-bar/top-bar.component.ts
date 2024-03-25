import {
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { ThemeService } from '../../services/theme.service';
import { CurrentUserService } from '../../services/current-user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'sm-top-bar',
    standalone: true,
    imports: [ButtonComponent],
    templateUrl: './top-bar.component.html',
    styleUrl: './top-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent implements OnInit {
    private readonly themeService = inject(ThemeService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly currentUserService = inject(CurrentUserService);

    protected themeButtonLabel$$ = computed(() => {
        return this.themeService.isDarkTheme$$() ? 'Light mode' : 'Dark mode';
    });

    protected currentUsername$$ = signal<string | null>(null);

    ngOnInit(): void {
        this.currentUserService.state$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((currentUser) => {
                this.currentUsername$$.set(currentUser?.username ?? null);
            });
    }

    protected toggleTheme() {
        this.themeService.toggleTheme();
    }

    handleLogout(): void {
        this.currentUserService.logout();
    }
}
