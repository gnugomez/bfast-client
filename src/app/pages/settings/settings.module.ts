import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
  },
];

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SettingsModule {}
