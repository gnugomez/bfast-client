import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from '../layouts/default/default-layout.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { LoggedGuard } from '../shared/guards/logged.guard';
import { HistoryViewComponent } from '../views/history-view/history-view.component';
import { MetricsViewComponent } from '../views/metrics-view/metrics-view.component';
import { NotFoundViewComponent } from '../views/not-found/not-found-view.component';
import { OverviewViewComponent } from '../views/overview/overview-view.component';
import { ShopViewComponent } from '../views/shop-view/shop-view.component';

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
      {
        path: 'shop',
        component: ShopViewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'metrics',
        component: MetricsViewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'history',
        component: HistoryViewComponent,
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
