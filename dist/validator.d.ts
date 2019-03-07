import "@nivinjoseph/n-ext";
import { BooleanPropertyValidator, NumberPropertyValidator, StringPropertyValidator, ArrayPropertyValidator, ObjectPropertyValidator } from "./property-validator";
import { ValidationInitializer } from "./validation-initializer";
import { ValidationExecutor } from "./validation-executor";
export declare class Validator<T> implements ValidationInitializer<T>, ValidationExecutor<T> {
    private readonly _propertyValidators;
    private readonly _errors;
    private _hasErrors;
    private _isEnabled;
    readonly isValid: boolean;
    readonly hasErrors: boolean;
    readonly errors: {
        [index: string]: any;
    };
    readonly hasRules: boolean;
    readonly isEnabled: boolean;
    constructor(isEnabled?: boolean);
    for<TProperty extends boolean>(propertyName: string): BooleanPropertyValidator<T>;
    for<TProperty extends number>(propertyName: string): NumberPropertyValidator<T>;
    for<TProperty extends string>(propertyName: string): StringPropertyValidator<T>;
    for<TProperty extends Array<any>>(propertyName: string): ArrayPropertyValidator<T>;
    for<TProperty extends object>(propertyName: string): ObjectPropertyValidator<T>;
    clearFor(propertyName: string): void;
    validate(value: T): void;
    enable(): void;
    disable(): void;
}
