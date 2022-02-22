import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalTargetComponent } from './portal-target.component';
import { PortalDirective } from './portal.directive';

@NgModule({
  declarations: [PortalTargetComponent, PortalDirective],
  imports: [CommonModule],
  exports: [PortalTargetComponent, PortalDirective],
})
export class PortalModule {}
