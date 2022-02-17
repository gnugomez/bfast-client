import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'src/app/components/card/card.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { NgIconsModule } from '@ng-icons/core';
import { RouterModule } from '@angular/router';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';
import { NewViewComponent } from './new-view/new-view.component';
import { ReactiveFormsModule } from '@angular/forms';

const importedComponents = [CardModule, ButtonModule, NgIconsModule];
const views = [NotFoundViewComponent, NewViewComponent];

const routes = [
  {
    path: 'new',
    component: NewViewComponent,
  },
  {
    path: 'not-found',
    component: NotFoundViewComponent,
  },
];
@NgModule({
  declarations: [...views],
  imports: [
    ...importedComponents,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class CreateOrganizationModule {}
