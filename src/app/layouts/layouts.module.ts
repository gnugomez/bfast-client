import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default/default-layout.component';
import { AuthLayoutComponent } from './auth/auth-layout.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { OrganizationSwapperComponent } from './components/organization-swapper/organization-swapper.component';
import { MenuComponent } from './components/menu/menu.component';
import {
  HeroIconModule,
  menuAlt2,
  shoppingBag,
  chartPie,
  clock,
  chevronDown,
  HeroIconOptions,
} from 'ng-heroicon';
import { WorkSpacesComponent } from './components/work-spaces/work-spaces.component';

const icons = {
  menuAlt2,
  shoppingBag,
  chartPie,
  clock,
  chevronDown,
};

const iconsOptions: HeroIconOptions = {
  /**
   * Child level options.
   * Non passed options will use the rootModule options.
   */
  defaultHostDisplay: 'block',
};

const components = [
  SidebarComponent,
  TopbarComponent,
  OrganizationSwapperComponent,
  MenuComponent,
  WorkSpacesComponent,
];
const layouts = [DefaultLayoutComponent, AuthLayoutComponent];

@NgModule({
  declarations: [...layouts, ...components],
  imports: [
    RouterModule,
    CommonModule,
    HeroIconModule.withIcons(icons, iconsOptions),
  ],
})
export class LayoutsModule {}
