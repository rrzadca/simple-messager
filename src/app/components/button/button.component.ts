import { Component, computed, Input, signal } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary';

@Component({
    selector: 'sm-button',
    standalone: true,
    imports: [],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
})
export class ButtonComponent {
    protected variant$$ = signal<ButtonVariant>('primary');
    protected cssClasses$$ = computed(() => {
        return this.getCssClasses(this.variant$$());
    });

    @Input() type: 'submit' | 'button' = 'button';
    @Input() set variant(value: ButtonVariant) {
        this.variant$$.set(value);
    }

    private getCssClasses(variant: ButtonVariant): string {
        const cssClasses: string[] = [
            'shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-200',
        ];

        switch (variant) {
            case 'primary':
                cssClasses.push(
                    'text-white bg-primary-700 hover:bg-primary-600 focus-visible:outline-primary-700 dark:text-black dark:bg-primary-700 dark:hover:bg-primary-600 dark:focus-visible:outline-primary-700',
                );
                break;
            case 'secondary':
                cssClasses.push(
                    'bg-secondary-800 dark:bg-secondary-200 text-secondary-200 dark:text-secondary-800 hover:bg-secondary-600 dark:hover:bg-secondary-400 focus-visible:outline-secondary-800 dark:focus-visible:outline-secondary-200',
                );
                break;
            default:
                break;
        }

        return cssClasses.join(' ');
    }
}
