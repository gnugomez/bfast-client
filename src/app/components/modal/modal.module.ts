import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { CardModule } from '../card/card.module';
import { PortalModule } from '../portal/portal.module';
import { ButtonModule } from '../button/button.module';
import { NgIconsModule } from '@ng-icons/core';
import { HeroX } from '@ng-icons/heroicons';
import { OutsideClickModule } from 'src/app/shared/directives/outside-click/outside-click.module';
import { DATA, ModalOutletComponent } from './modal-outlet/modal-outlet.component';

@NgModule({
  declarations: [ModalComponent, ModalOutletComponent],
  imports: [
    CommonModule,
    CardModule,
    PortalModule,
    ButtonModule,
    OutsideClickModule,
    NgIconsModule.withIcons({
      HeroX,
    }),
  ],
  providers: [
    { provide: DATA, useValue: '' }
  ],
  exports: [ModalComponent, ModalOutletComponent],
})
export class ModalModule { }
