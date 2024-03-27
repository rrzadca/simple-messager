import { Component, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'sm-device-card',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './device-card.component.html',
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
})
export class DeviceCardComponent {
    protected label$$ = signal<string | null>(null);

    @Input() set label(value: string) {
        this.label$$.set(value);
    }
}
