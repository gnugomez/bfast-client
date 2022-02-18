import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'src/app/components/card/card.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { NgIconsModule } from '@ng-icons/core';
import { RouterModule } from '@angular/router';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';
import { NewViewComponent } from './new-view/new-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IsLoggedGuard } from 'src/app/shared/guards/is-logged.guard';
import { NotHaveOrganizationGuard } from 'src/app/shared/guards/not-have-organization.guard';
import { HaveOrganizationGuard } from 'src/app/shared/guards/have-organization.guard';
import { HeroArrowSmLeft } from '@ng-icons/heroicons';

const importedComponents = [CardModule, ButtonModule, NgIconsModule];
const views = [NotFoundViewComponent, NewViewComponent];
const icons = { HeroArrowSmLeft };

const routes = [
  {
    path: 'new',
    canActivate: [IsLoggedGuard, HaveOrganizationGuard],
    component: NewViewComponent,
  },
  {
    path: 'not-found',
    canActivate: [IsLoggedGuard, NotHaveOrganizationGuard],
    component: NotFoundViewComponent,
  },
];
@NgModule({
  declarations: [...views],
  imports: [
    ...importedComponents,
    CommonModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons(icons),
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class CreateOrganizationModule {}
