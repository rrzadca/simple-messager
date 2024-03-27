import { effect, Inject, inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private readonly localStorageService = inject(LocalStorageService);

    isDarkTheme$$ = signal<boolean>(false);

    constructor(@Inject(DOCUMENT) private readonly document: Document) {
        effect(() => {
            this.setTheme(this.isDarkTheme$$());
        });

        this.initTheme();
    }

    toggleTheme(): void {
        this.isDarkTheme$$.set(!this.isDarkTheme$$());
    }

    private initTheme(): void {
        const isDarkTheme =
            this.localStorageService.getItem('theme') === 'dark' ||
            (!this.localStorageService.hasKey('theme') &&
                window.matchMedia('(prefers-color-scheme: dark)').matches);

        this.isDarkTheme$$.set(isDarkTheme);
    }

    private setTheme(isDarkMode: boolean): void {
        this.localStorageService.setItem(
            'theme',
            isDarkMode ? 'dark' : 'light',
        );
        this.document.documentElement.classList.toggle('dark', isDarkMode);
    }
}
