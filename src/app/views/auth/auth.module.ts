import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { CardModule } from 'src/app/components/card/card.module';
import { LoginViewComponent } from './login-view/login-view.component';
import { RegisterViewComponent } from './register-view/register-view.component';
import { ButtonModule } from 'src/app/components/button/button.module';

const views = [LoginViewComponent, RegisterViewComponent];
const components = [CardModule, ButtonModule];
@NgModule({
  declarations: [...views],
  imports: [CommonModule, AuthRoutingModule, ...components],
})
export class AuthModule {}
