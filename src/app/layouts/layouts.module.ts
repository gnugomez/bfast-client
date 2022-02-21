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
  HeroMenuAlt2,
  HeroMenuAlt1,
  HeroShoppingBag,
  HeroChartPie,
  HeroClock,
  HeroChevronDown,
  HeroSearch,
  HeroCash,
  HeroBell,
  HeroMenu,
  HeroX,
  HeroHome,
  HeroHomeSolid,
  HeroShoppingBagSolid,
  HeroChartPieSolid,
  HeroClockSolid,
  HeroCog,
} from '@ng-icons/heroicons';
import { ButtonModule } from '../components/button/button.module';
import { OutsideClickModule } from '../shared/directives/outside-click/outside-click.module';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { MenuModule } from 'headlessui-angular';
import { NgIconsModule } from '@ng-icons/core';

const icons = {
  HeroMenuAlt2,
  HeroMenuAlt1,
  HeroShoppingBag,
  HeroChartPie,
  HeroClock,
  HeroChevronDown,
  HeroSearch,
  HeroCash,
  HeroBell,
  HeroMenu,
  HeroX,
  HeroHome,
  HeroHomeSolid,
  HeroShoppingBagSolid,
  HeroChartPieSolid,
  HeroClockSolid,
  HeroCog,
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
    NgIconsModule.withIcons(icons),
  ],
})
export class LayoutsModule {}
