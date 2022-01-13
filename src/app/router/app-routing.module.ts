import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from '../layouts/default/default-layout.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { LoggedGuard } from '../shared/guards/logged.guard';
import { NotFoundViewComponent } from '../views/not-found/not-found-view.component';
import { OverviewViewComponent } from '../views/overview/overview-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [LoggedGuard],
    loadChildren: () =>
      import('../views/auth/auth-view.module').then((m) => m.AuthViewModule),
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'overview',
        component: OverviewViewComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '404',
    component: NotFoundViewComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
