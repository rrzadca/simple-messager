import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { TableColumn } from '../../models/table-column.model';
import { TableRowOption } from '../../models/table-row-option.model';
import { ButtonComponent } from '../../../button/button.component';

@Component({
    selector: 'sm-table-row',
    templateUrl: './table-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, ButtonComponent],
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

    protected isOptionVisible(option: TableRowOption, rowItem: any): boolean {
        if (option.isVisible === undefined || option.isVisible === null) {
            return true;
        }
        return option.isVisible(rowItem);
    }
}
