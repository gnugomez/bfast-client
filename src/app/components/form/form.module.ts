import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormInputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FormInputComponent],
})
export class FormModule {}
