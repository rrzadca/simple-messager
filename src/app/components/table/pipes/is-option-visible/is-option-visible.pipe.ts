import { Pipe, PipeTransform } from '@angular/core';
import { TableRowOption } from '../../models/table-row-option.model';

@Pipe({
    name: 'smIsOptionVisible',
    standalone: true,
})
export class IsOptionVisiblePipe implements PipeTransform {
    transform(option: TableRowOption, item: any): boolean {
        if (option.isVisible === undefined || option.isVisible === null) {
            return true;
        }
        return option.isVisible(item);
    }
}
