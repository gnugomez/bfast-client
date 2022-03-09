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
      import('../pages/auth/auth.module').then((m) => m.AuthModule),
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
      {
        path: 'settings',
        loadChildren: () =>
          import('../pages/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
    ],
  },
  {
    path: 'organization',
    loadChildren: () =>
      import('../pages/organization/organization.module').then(
        (m) => m.CreateOrganizationModule
      ),
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
