import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { TableColumn } from '../../models/table-column.model';
import { TableRowOption } from '../../models/table-row-option.model';
import { TableRowComponent } from '../table-row/table-row.component';

@Component({
    selector: 'sm-table',
    templateUrl: './table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, TableRowComponent],
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
})
export class TableComponent implements OnInit {
    @Input() data: any[] = [];
    @Input({ required: true }) tableColumns: TableColumn[] = [];
    @Input() rowOptions: TableRowOption[] = [];

    constructor() {}

    ngOnInit(): void {}
}
