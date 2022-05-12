import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekDayToString'
})
export class WeekDayToStringPipe implements PipeTransform {

  transform(weekDay: number, ...args: unknown[]): unknown {
    switch (weekDay) {
      case 0:
        return 'Lunes'
      case 1:
        return 'Martes'
      case 2:
        return 'Miércoles'
      case 3:
        return 'Jueves'
      case 4:
        return 'Viernes'
      case 5:
        return 'Sábado'
      case 6:
        return 'Domingo'
      default:
        return 'Unknown'
    }

  }

}
