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
            component: MembersViewComponent,
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
  ],
  imports: [
    CommonModule,
    LoaderModule,
    ButtonModule,
    ModalModule,
    FormModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class SettingsModule {}
