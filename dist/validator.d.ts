import "@nivinjoseph/n-ext";
import { PropertyValidator, BooleanPropertyValidator, NumberPropertyValidator, StringPropertyValidator, ArrayPropertyValidator, ObjectPropertyValidator } from "./property-validator";
export declare class Validator<T> {
    private readonly _propertyValidators;
    private readonly _errors;
    private _hasErrors;
    private _isEnabled;
    get isValid(): boolean;
    get hasErrors(): boolean;
    get errors(): {
        [key in keyof T]: any;
    };
    get hasRules(): boolean;
    get isEnabled(): boolean;
    constructor(isEnabled?: boolean);
    for<K extends keyof T, TProperty extends T[K]>(propertyName: K): TProperty extends (boolean | null | undefined) ? BooleanPropertyValidator<T> : TProperty extends (number | null | undefined) ? NumberPropertyValidator<T> : TProperty extends (string | null | undefined) ? StringPropertyValidator<T> : TProperty extends (ReadonlyArray<infer A> | null | undefined) ? ArrayPropertyValidator<T, A> : TProperty extends (object | null | undefined) ? ObjectPropertyValidator<T, TProperty> : PropertyValidator<T, TProperty>;
    clearFor<K extends keyof T>(propertyName: K): void;
    validate(value: T): void;
    enable(): void;
    disable(): void;
}
