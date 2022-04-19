import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { Route, RouterModule } from '@angular/router';
import { MembersViewComponent } from './organization/members-view/members-view.component';
import { LoaderModule } from 'src/app/components/loader/loader.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { AccountViewComponent } from './personal/account-view/account-view.component';
import { AddNewMemberDialogComponent } from './organization/members-view/add-new-member-dialog/add-new-member-dialog.component';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { FormModule } from 'src/app/components/form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { HeroChevronDown, HeroCheck, HeroDotsHorizontal } from '@ng-icons/heroicons';
import { MenuModule } from 'headlessui-angular';
import { OptionsViewComponent } from './organization/options-view/options-view.component';
import { WorkspacesViewComponent } from './organization/workspaces-view/workspaces-view.component';
import { IsPrivilegedGuard } from 'src/app/shared/guards/is-privileged.guard';
import { CreateNewWorkspaceDialog } from './organization/workspaces-view/create-new-workspace-dialog/create-new-workspace-dialog.component';
import { DeleteWorkspaceDialog } from './organization/workspaces-view/delete-workspace-dialog/delete-workspace-dialog.component';

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
    AddNewMemberDialogComponent,
    OptionsViewComponent,
    WorkspacesViewComponent,
    CreateNewWorkspaceDialog,
    DeleteWorkspaceDialog
  ],
  imports: [
    CommonModule,
    LoaderModule,
    ButtonModule,
    ModalModule,
    FormModule,
    ReactiveFormsModule,
    MenuModule,
    FormModule,
    NgIconsModule.withIcons({
      HeroChevronDown, HeroCheck, HeroDotsHorizontal
    }),
    RouterModule.forChild(routes),
  ],
})
export class SettingsModule { }
