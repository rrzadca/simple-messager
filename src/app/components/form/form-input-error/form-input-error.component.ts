import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'sm-form-input-error',
    standalone: true,
    imports: [],
    templateUrl: './form-input-error.component.html',
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInputErrorComponent {
    @Input() error: string | undefined;
}
