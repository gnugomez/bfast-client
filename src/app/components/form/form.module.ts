import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormTextAreaComponent } from './text-area/text-area.component';

@NgModule({
  declarations: [FormInputComponent, FormTextAreaComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FormInputComponent, FormTextAreaComponent],
})
export class FormModule { }
