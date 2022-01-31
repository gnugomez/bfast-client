import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { CardModule } from 'src/app/components/card/card.module';
import { LoginViewComponent } from './login-view/login-view.component';
import { RegisterViewComponent } from './register-view/register-view.component';
import { ButtonModule } from 'src/app/components/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProgressModule } from 'src/app/components/progress/progress.module';
import { RegisterEmailComponent } from './register-view/steps/email/email.component';
import { NameComponent } from './register-view/steps/name/name.component';
import { PasswordComponent } from './register-view/steps/password/password.component';
import { OrganizationComponent } from './register-view/steps/organization/organization.component';
import {
  HeroArrowSmLeft,
  HeroArrowSmRight,
  HeroEye,
  HeroEyeOff,
} from '@ng-icons/heroicons';
import { NgIconsModule } from '@ng-icons/core';

const views = [LoginViewComponent, RegisterViewComponent];
const components = [CardModule, ButtonModule, ProgressModule];
const icons = { HeroArrowSmLeft, HeroArrowSmRight, HeroEye, HeroEyeOff };
@NgModule({
  declarations: [
    ...views,
    RegisterEmailComponent,
    NameComponent,
    PasswordComponent,
    OrganizationComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgIconsModule.withIcons(icons),
    ...components,
  ],
})
export class AuthViewModule {}
