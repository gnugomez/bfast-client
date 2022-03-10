import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutModule } from './default/default-layout.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, DefaultLayoutModule],
  exports: [DefaultLayoutModule],
})
export class LayoutsModule {}
