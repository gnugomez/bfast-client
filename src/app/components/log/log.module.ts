import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrBlockComponent } from './log.component';
import { NgIconsModule } from '@ng-icons/core';
import { HeroCamera, HeroQrcode } from '@ng-icons/heroicons';



@NgModule({
  declarations: [
    QrBlockComponent
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({
      HeroQrcode,
      HeroCamera
    })
  ],
  exports: [
    QrBlockComponent
  ]
})
export class LogModule { }
