import { Injectable } from '@angular/core';

export type LocalStorageKey = 'theme';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    getItem(key: LocalStorageKey): string | null {
        return localStorage.getItem(key);
    }

    setItem(key: LocalStorageKey, value: string): void {
        localStorage.setItem(key, value);
    }

    removeItem(key: LocalStorageKey): void {
        localStorage.removeItem(key);
    }

    hasKey(key: LocalStorageKey): boolean {
        return key in localStorage;
    }
}
