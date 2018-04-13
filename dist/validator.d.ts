import "@nivinjoseph/n-ext";
import { PropertyValidator } from "./property-validator";
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
    for<TProperty>(propertyName: string): PropertyValidator<T, TProperty>;
    validate(value: T): void;
    enable(): void;
    disable(): void;
}
