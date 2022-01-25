import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default/default-layout.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { OrganizationSwapperComponent } from './components/organization-swapper/organization-swapper.component';
import { MenuComponent } from './components/menu/menu.component';
import { WorkSpacesComponent } from './components/work-spaces/work-spaces.component';
import { SearchComponent } from './components/search/search.component';
import { CoinsComponent } from './components/coins/coins.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { UserComponent } from './components/user/user.component';
import {
  HeroIconModule,
  menuAlt2,
  menuAlt1,
  shoppingBag,
  chartPie,
  clock,
  chevronDown,
  search,
  cash,
  HeroIconOptions,
  bell,
  menu,
  x,
  home,
} from 'ng-heroicon';
import { ButtonComponent } from '../components/button/button.component';
import { ButtonModule } from '../components/button/button.module';
import { OutsideClickModule } from '../shared/directives/outside-click/outside-click.module';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { MenuModule } from 'headlessui-angular';

const icons = {
  menuAlt2,
  menuAlt1,
  shoppingBag,
  chartPie,
  clock,
  chevronDown,
  search,
  cash,
  bell,
  menu,
  x,
  home,
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
  SearchComponent,
  CoinsComponent,
  NotificationsComponent,
  UserComponent,
  MobileMenuComponent,
];
const layouts = [DefaultLayoutComponent];

@NgModule({
  declarations: [...layouts, ...components],
  imports: [
    RouterModule,
    CommonModule,
    ButtonModule,
    OutsideClickModule,
    MenuModule,
    HeroIconModule.withIcons(icons, iconsOptions),
  ],
})
export class LayoutsModule {}
