import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'resueltopendiente'
})

export class ResueltoPendientePipe implements PipeTransform {
    result;
    transform(value: any) {
        if (value === '0') {
            this.result = 'Pendiente';
        } else if (value === '1') {
            this.result = 'Resuelto';
        }
        return this.result;
    }
}
