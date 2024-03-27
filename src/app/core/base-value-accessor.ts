import { ControlValueAccessor, NgControl } from '@angular/forms';

export abstract class BaseValueAccessor<T> implements ControlValueAccessor {
    isDisabled = false;
    private innerValue: T | null = null;

    protected constructor(protected ngControl: NgControl) {
        if (ngControl) {
            ngControl.valueAccessor = this;
        } else {
            throw new Error(`ngControl not found`);
        }
    }

    onValueChangeEvent: (value: T | null) => void = () => {};

    onTouchEvent: () => void = () => {};

    registerOnChange(onChangeFn: (value: T | null) => void): void {
        this.onValueChangeEvent = onChangeFn;
    }

    registerOnTouched(onTouchFn: () => void): void {
        this.onTouchEvent = onTouchFn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    writeValue(value: T | null): void {
        this.value = value;
    }

    get value(): T | null {
        return this.innerValue;
    }

    set value(value: T | null) {
        if (value !== this.innerValue) {
            this.innerValue = value;
            this.onValueChangeEvent(value);
        }
    }

    get isInvalid(): boolean {
        return !!this.ngControl.invalid && !!this.ngControl.touched;
    }

    get errorMessages(): string[] | null {
        const controlErrors = this.ngControl.errors;

        if (!controlErrors) {
            return null;
        }

        const errors = Object.keys(controlErrors);
        if (!errors || errors.length === 0) {
            return null;
        }

        return errors;
    }
}
