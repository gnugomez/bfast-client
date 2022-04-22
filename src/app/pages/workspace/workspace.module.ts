import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { Route, RouterModule } from '@angular/router';
import { LoaderModule } from 'src/app/components/loader/loader.module';
import { UsersTabComponent } from './users-tab/users-tab.component';
import { SettingsTabComponent } from './settings-tab/settings-tab.component';
import { OverviewTabComponent } from './overview-tab/overview-tab.component';
import { ButtonModule } from 'src/app/components/button/button.module';
import { NgIconsModule } from '@ng-icons/core';
import { HeroCheck, HeroChevronDown, HeroDotsHorizontal } from '@ng-icons/heroicons';
import { MenuModule } from 'headlessui-angular';

const routes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: OverviewTabComponent,
      },
      {
        path: 'users',
        component: UsersTabComponent,
      },
      {
        path: 'settings',
        component: SettingsTabComponent,
      },
    ]
  }
]

@NgModule({
  declarations: [
    LayoutComponent,
    UsersTabComponent,
    SettingsTabComponent,
    OverviewTabComponent
  ],
  imports: [
    CommonModule,
    LoaderModule,
    ButtonModule,
    MenuModule,
    RouterModule.forChild(routes),
    NgIconsModule.withIcons({
      HeroChevronDown, HeroCheck, HeroDotsHorizontal
    })
  ]
})
export class WorkspaceModule { }
