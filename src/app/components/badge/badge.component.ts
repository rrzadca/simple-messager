import {
    ChangeDetectionStrategy,
    Component,
    computed,
    Input,
    signal,
} from '@angular/core';

export type BadgeVariant = 'error' | 'info';

@Component({
    selector: 'sm-badge',
    standalone: true,
    imports: [],
    templateUrl: './badge.component.html',
    styles: [
        `
            :host {
                display: inline-block;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
    protected variant$$ = signal<BadgeVariant>('info');
    protected cssClasses$$ = computed(() => {
        return this.getCssClasses(this.variant$$());
    });

    @Input({ required: true }) text: string | null = null;
    @Input() set variant(value: BadgeVariant) {
        this.variant$$.set(value);
    }

    private getCssClasses(variant: BadgeVariant): string {
        const cssClasses: string[] = [
            'rounded-lg text-sm text-primary-50 px-2 py-0.5',
        ];

        switch (variant) {
            case 'info':
                cssClasses.push('bg-info-500 dark:bg-info-900');
                break;
            case 'error':
                cssClasses.push('bg-error-600');
                break;
            default:
                break;
        }

        return cssClasses.join(' ');
    }
}
