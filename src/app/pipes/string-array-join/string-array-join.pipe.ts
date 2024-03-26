import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stringArrayJoin',
    standalone: true,
})
export class StringArrayJoinPipe implements PipeTransform {
    transform(value: string[], separator = ', '): string {
        if (!value) {
            return '';
        }
        return value.join(separator);
    }
}
