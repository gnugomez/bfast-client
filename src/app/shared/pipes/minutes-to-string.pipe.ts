import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToString'
})
export class MinutesToStringPipe implements PipeTransform {

  transform(minutes: number, ...args: unknown[]): unknown {
    const hours = Math.floor(minutes / 60)
    const minutesLeft = minutes % 60
    const amPm = hours > 12 ? 'PM' : 'AM'
    return `${hours > 12 ? hours - 12 : hours}:${minutesLeft < 10 ? '0' : ''}${minutesLeft} ${amPm}`
  }


}
