import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { LoaderOverlayComponent } from './overlay/overlay.component';

@NgModule({
  declarations: [LoaderComponent, LoaderOverlayComponent],
  imports: [CommonModule],
  exports: [LoaderComponent, LoaderOverlayComponent],
})
export class LoaderModule {}
