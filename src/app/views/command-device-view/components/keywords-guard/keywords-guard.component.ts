import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../../../components/button/button.component';
import { InputTextComponent } from '../../../../components/form/inputs/input-text/input-text.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../api/services/api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'sm-keywords-guard',
    standalone: true,
    imports: [ButtonComponent, InputTextComponent, FormsModule],
    templateUrl: './keywords-guard.component.html',
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
})
export class KeywordsGuardComponent implements OnInit {
    private readonly apiService = inject(ApiService);
    private readonly destroyRef = inject(DestroyRef);

    protected keywords$$ = signal<string[]>([]);
    protected keyword: string | null = null;

    ngOnInit(): void {
        this.apiService.messageSent$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((message) => {
                const messageLowered = message.text.toLowerCase();
                const detectedKeywords: string[] = this.keywords$$().reduce(
                    (acc: string[], keyword) => {
                        if (messageLowered.includes(keyword.toLowerCase())) {
                            acc.push(keyword);
                        }
                        return acc;
                    },
                    [],
                );

                alert('Detected keywords: ' + detectedKeywords.join(', '));
            });
    }

    handleAddKeyword(): void {
        if (this.keyword) {
            this.keywords$$.set([...this.keywords$$(), this.keyword]);
            this.keyword = null;
        }
    }
}
