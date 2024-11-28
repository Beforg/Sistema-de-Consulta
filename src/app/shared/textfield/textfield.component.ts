import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

type InputTypes = 'text' | 'password' | 'date';

@Component({
  selector: 'app-textfield',
  standalone: true,
  imports: [CommonModule, NgxMaskDirective],
  templateUrl: './textfield.component.html',
  styleUrl: './textfield.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextfieldComponent),
      multi: true
    }
  ]
})
export class TextfieldComponent implements ControlValueAccessor {
  @Input() type: InputTypes = 'text';
  @Input() prompt: string = "";
  @Input() icone: string = "";
  @Input() mask: string = "";

  public onChange: (value: any) => void = () => {};
  public onTouched: () => void = () => {};
  public isDisabled: boolean = false;
  public value: string = "";

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
