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
    for<K extends keyof T, TProperty extends T[K]>(propertyName: K): TProperty extends boolean ? BooleanPropertyValidator<T> : TProperty extends number ? NumberPropertyValidator<T> : TProperty extends string ? StringPropertyValidator<T> : TProperty extends ReadonlyArray<infer A> ? ArrayPropertyValidator<T, A> : TProperty extends object ? ObjectPropertyValidator<T, TProperty> : PropertyValidator<T, TProperty>;
    clearFor<K extends keyof T>(propertyName: K): void;
    validate(value: T): void;
    enable(): void;
    disable(): void;
}
