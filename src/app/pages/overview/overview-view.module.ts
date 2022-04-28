import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewViewComponent } from './overview-view.component';
import { CardModule } from 'src/app/components/card/card.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { NgIconsModule } from '@ng-icons/core';
import { HeroArrowNarrowRight, HeroQrcode, HeroCamera } from '@ng-icons/heroicons';
import { RouterModule } from '@angular/router';
import { LogModule } from 'src/app/components/log/log.module';



@NgModule({
  declarations: [
    OverviewViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    LogModule,
    NgIconsModule.withIcons({
      HeroArrowNarrowRight,
      HeroQrcode,
      HeroCamera
    })
  ],
  exports: [
    OverviewViewComponent
  ],
})
export class OverviewViewModule { }
