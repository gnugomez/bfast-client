import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutsideClick } from './outside-click.directive';

@NgModule({
  declarations: [OutsideClick],
  imports: [CommonModule],
  exports: [OutsideClick],
})
export class OutsideClickModule {}
