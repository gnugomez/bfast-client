import { Component, Input, Optional, Self } from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class FormInputComponent implements ControlValueAccessor {
  public onChange: any = (value: string) => {};
  public onTouched: any = () => {};
  public disabled = false;
  public touched = false;

  @Input() public label: string = '';
  @Input() public inputType: string = 'text';

  public val: string = '';

  constructor(@Self() @Optional() public control: NgControl) {
    this.control.valueAccessor = this;
  }

  set value(value: string) {
    this.markAsTouched();

    if (!this.disabled) {
      this.onChange(value);
      this.val = value;
    }
  }

  get value(): string {
    return this.val;
  }

  public writeValue(value: any): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  public markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
