import { ChangeDetectionStrategy, Component, Input, Self } from '@angular/core';
import { BaseValueAccessor } from '../../../../core/base-value-accessor';
import { NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'sm-input-text',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './input-text.component.html',
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
})
export class InputTextComponent extends BaseValueAccessor<string> {
    @Input() label: string | undefined;
    @Input() placeholder: string = '';

    constructor(@Self() public override ngControl: NgControl) {
        super(ngControl);
    }

    onValueChange(value: string | null): void {
        this.value = value;
    }
}
