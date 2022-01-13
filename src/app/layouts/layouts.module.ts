import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default/default-layout.component';
import { AuthLayoutComponent } from './auth/auth-layout.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';

const components = [SidebarComponent, TopbarComponent];
const layouts = [DefaultLayoutComponent, AuthLayoutComponent];

@NgModule({
  declarations: [...layouts, ...components],
  imports: [RouterModule, CommonModule],
})
export class LayoutsModule {}
