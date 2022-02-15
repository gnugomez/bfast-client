import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from '../layouts/default/default-layout.component';
import { IsLoggedGuard } from '../shared/guards/is-logged.guard';
import { NotLoggedGuard } from '../shared/guards/not-logged.guard';
import { HistoryViewComponent } from '../pages/history/history-view.component';
import { MetricsViewComponent } from '../pages/metrics/metrics-view.component';
import { NotFoundViewComponent } from '../pages/not-found/not-found-view.component';
import { OverviewViewComponent } from '../pages/overview/overview-view.component';
import { ShopViewComponent } from '../pages/shop/shop-view.component';
import { HaveOrganizationGuard } from '../shared/guards/have-organization.guard';
import { NotHaveOrganizationGuard } from '../shared/guards/not-have-organization.guard';
import { CreateOrganizationComponent } from '../pages/create-organization/create-organization.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [NotLoggedGuard],
    loadChildren: () =>
      import('../pages/auth/auth-view.module').then((m) => m.AuthViewModule),
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [IsLoggedGuard, HaveOrganizationGuard],
    children: [
      {
        path: 'overview',
        component: OverviewViewComponent,
      },
      {
        path: 'shop',
        component: ShopViewComponent,
      },
      {
        path: 'metrics',
        component: MetricsViewComponent,
      },
      {
        path: 'history',
        component: HistoryViewComponent,
      },
    ],
  },
  {
    path: 'organization-not-found',
    canActivate: [IsLoggedGuard, NotHaveOrganizationGuard],
    component: CreateOrganizationComponent,
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
