import { Component, Input, Optional, Self } from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-form-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})

export class FormTextAreaComponent implements ControlValueAccessor {
  public onChange: any = (value: string) => { };
  public onTouched: any = () => { };
  public disabled = false;
  public touched = false;

  @Input() public label: string = '';
  @Input() public innerLabel: boolean = true;
  @Input() public id: string = this.label + Math.floor(Math.random() * 100);

  public val: string = '';

  constructor(@Self() @Optional() public control: NgControl) {
    this.control.valueAccessor = this
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
