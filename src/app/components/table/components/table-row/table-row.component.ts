import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { TableColumn } from '../../models/table-column.model';
import { TableRowOption } from '../../models/table-row-option.model';

@Component({
    selector: 'sm-table-row',
    templateUrl: './table-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule],
    styles: [
        `
            :host {
                display: table-row-group;
                box-sizing: border-box;
            }
        `,
    ],
})
export class TableRowComponent implements OnInit {
    @Input() tableColumns: TableColumn[] = [];
    @Input() rowOptions: TableRowOption[] = [];
    @Input({ required: true }) data: any | null = null;

    constructor() {}

    ngOnInit(): void {}
}
