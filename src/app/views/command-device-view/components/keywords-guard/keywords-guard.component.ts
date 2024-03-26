import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../../../components/button/button.component';
import { InputTextComponent } from '../../../../components/form/inputs/input-text/input-text.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../api/services/api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { TableComponent } from '../../../../components/table/components/table/table.component';
import { TableColumn } from '../../../../components/table/models/table-column.model';

interface KeywordRowItem {
    keywords: string;
    username: string;
    messageText: string;
    sentAt: string;
}

@Component({
    selector: 'sm-keywords-guard',
    standalone: true,
    imports: [ButtonComponent, InputTextComponent, FormsModule, TableComponent],
    providers: [DatePipe],
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
    private readonly toastrService = inject(ToastrService);
    private readonly datePipe = inject(DatePipe);

    protected keywords$$ = signal<string[]>([]);
    protected keywordList$$ = signal<KeywordRowItem[]>([]);
    protected keyword: string | null = null;
    protected tableColumns: TableColumn[] = [];

    ngOnInit(): void {
        this.initTableColumns();
        this.listenForMessages();
    }

    protected handleAddKeyword(): void {
        if (this.keyword) {
            this.keywords$$.set([...this.keywords$$(), this.keyword]);
            this.keyword = null;
        }
    }

    private listenForMessages(): void {
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

                if (detectedKeywords.length) {
                    this.toastrService.warning(
                        `Keyword detected in new message`,
                        undefined,
                        { timeOut: 4000, enableHtml: true },
                    );

                    this.keywordList$$.set([
                        ...this.keywordList$$(),
                        {
                            keywords: detectedKeywords.join(', '),
                            username: message.username,
                            messageText: message.text,
                            sentAt:
                                this.datePipe.transform(
                                    message.sentAt,
                                    'dd.MM.yyyy HH:mm:ss',
                                    'UTC',
                                ) ?? '',
                        },
                    ]);
                }
            });
    }

    private initTableColumns(): void {
        this.tableColumns = [
            {
                fieldName: 'keywords',
                label: 'Keywords',
            },
            {
                fieldName: 'username',
                label: 'Username',
            },
            {
                fieldName: 'messageText',
                label: 'Message',
            },
            {
                fieldName: 'sentAt',
                label: 'Sent at',
            },
        ];
    }
}
