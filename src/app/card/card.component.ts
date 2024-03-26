import { Component, Input } from '@angular/core';

@Component({
    selector: 'sm-card',
    standalone: true,
    imports: [],
    templateUrl: './card.component.html',
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
})
export class CardComponent {
    @Input() headerText: string | null = null;
}
