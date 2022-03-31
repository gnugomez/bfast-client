import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { Route, RouterModule } from '@angular/router';
import { MembersViewComponent } from './organization/members-view/members-view.component';
import { LoaderModule } from 'src/app/components/loader/loader.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { AccountViewComponent } from './personal/account-view/account-view.component';
import { AddNewDialogComponent } from './organization/members-view/add-new-dialog/add-new-dialog.component';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { FormModule } from 'src/app/components/form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { HeroChevronDown, HeroCheck } from '@ng-icons/heroicons';
import { MenuModule } from 'headlessui-angular';
import { OptionsViewComponent } from './organization/options-view/options-view.component';
import { WorkspacesViewComponent } from './organization/workspaces-view/workspaces-view.component';
import { IsPrivilegedGuard } from 'src/app/shared/guards/is-Privileged.guard';

const routes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'organization',
        children: [
          {
            path: 'members',
            canActivate: [IsPrivilegedGuard],
            component: MembersViewComponent,
          },
          {
            path: 'options',
            component: OptionsViewComponent,
          },
          {
            path: 'workspaces',
            component: WorkspacesViewComponent,
          },
        ],
      },
      {
        path: 'personal',
        children: [
          {
            path: 'account',
            component: AccountViewComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    LayoutComponent,
    MembersViewComponent,
    AccountViewComponent,
    AddNewDialogComponent,
    OptionsViewComponent,
    WorkspacesViewComponent,
  ],
  imports: [
    CommonModule,
    LoaderModule,
    ButtonModule,
    ModalModule,
    FormModule,
    ReactiveFormsModule,
    MenuModule,
    NgIconsModule.withIcons({
      HeroChevronDown, HeroCheck
    }),
    RouterModule.forChild(routes),
  ],
})
export class SettingsModule { }
