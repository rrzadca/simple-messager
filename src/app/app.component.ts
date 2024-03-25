import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
})
export class AppComponent {
    title = 'Simple Messager';
}
