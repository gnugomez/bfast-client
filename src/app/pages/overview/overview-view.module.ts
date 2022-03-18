import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewViewComponent } from './overview-view.component';
import { CardModule } from 'src/app/components/card/card.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { NgIconsModule } from '@ng-icons/core';
import { HeroArrowNarrowRight } from '@ng-icons/heroicons';



@NgModule({
  declarations: [
    OverviewViewComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    NgIconsModule.withIcons({
      HeroArrowNarrowRight
    })
  ],
  exports: [
    OverviewViewComponent
  ],
})
export class OverviewViewModule { }
