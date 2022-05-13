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
import { AddNewMemberDialogComponent } from './users-tab/add-new-member-dialog/add-new-member-dialog.component';
import { FormModule } from 'src/app/components/form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { RoleDropdownComponent } from './users-tab/role-dropdown/role-dropdown.component';
import { CardModule } from 'src/app/components/card/card.module';
import { LogModule } from 'src/app/components/log/log.module';
import { SchedulesTabComponent } from './schedules-tab/schedules-tab.component';
import { HistoryTabComponent } from './history-tab/history-tab.component';
import { AddNewScheduleDialogComponent } from './schedules-tab/add-new-schedule-dialog/add-new-schedule-dialog.component';
import { DeleteButtonComponent } from './schedules-tab/delete-button/delete-button.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScheduleBlockComponent } from './overview-tab/schedule-block/schedule-block.component';

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
      {
        path: 'schedules',
        component: SchedulesTabComponent,
      },
      {
        path: 'history',
        component: HistoryTabComponent,
      }
    ]
  }
]

@NgModule({
  declarations: [
    LayoutComponent,
    UsersTabComponent,
    SettingsTabComponent,
    OverviewTabComponent,
    AddNewMemberDialogComponent,
    RoleDropdownComponent,
    SchedulesTabComponent,
    AddNewScheduleDialogComponent,
    HistoryTabComponent,
    DeleteButtonComponent,
    ScheduleBlockComponent
  ],
  imports: [
    CommonModule,
    LoaderModule,
    ButtonModule,
    MenuModule,
    FormModule,
    ReactiveFormsModule,
    ModalModule,
    CardModule,
    LogModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgIconsModule.withIcons({
      HeroChevronDown, HeroCheck, HeroDotsHorizontal
    })
  ]
})
export class WorkspaceModule { }
