import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogComponent } from './log.component';
import { NgIconsModule } from '@ng-icons/core';
import { HeroCamera, HeroQrcode, HeroX } from '@ng-icons/heroicons';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { LoaderModule } from '../loader/loader.module';



@NgModule({
  declarations: [
    LogComponent
  ],
  imports: [
    ZXingScannerModule,
    CommonModule,
    LoaderModule,
    NgIconsModule.withIcons({
      HeroQrcode,
      HeroCamera,
      HeroX
    })
  ],
  exports: [
    LogComponent
  ]
})
export class LogModule { }
