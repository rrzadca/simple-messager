import { Component, computed, Input, signal } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary';

@Component({
    selector: 'sm-button',
    standalone: true,
    imports: [],
    templateUrl: './button.component.html',
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
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
            'shadow-sm rounded-md px-2.5 py-1.5 text-sm',
        ];
        cssClasses.push(
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-200',
        );

        switch (variant) {
            case 'primary':
                cssClasses.push(
                    'text-white bg-primary-700 hover:bg-primary-600 focus-visible:outline-primary-700',
                );
                cssClasses.push(
                    'dark:text-black dark:bg-primary-700 dark:hover:bg-primary-600 dark:focus-visible:outline-primary-700',
                );
                break;
            case 'secondary':
                cssClasses.push(
                    'bg-tertiary-700 text-tertiary-100 hover:bg-tertiary-600 focus-visible:outline-secondary-800',
                );
                cssClasses.push(
                    'dark:bg-tertiary-900 dark:text-primary-100 dark:hover:bg-tertiary-800 dark:focus-visible:outline-secondary-200',
                );
                break;
            default:
                break;
        }

        return cssClasses.join(' ');
    }
}
