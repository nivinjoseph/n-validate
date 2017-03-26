import "n-ext";
import PropertyValidator from "./property-validator";
import ValidationInitializer from "./validation-initializer";
import ValidationExecutor from "./validation-executor";
export default class Validator<T> implements ValidationInitializer<T>, ValidationExecutor<T> {
    private _propertyValidators;
    private _hasErrors;
    private _errors;
    readonly isValid: boolean;
    readonly hasErrors: boolean;
    readonly errors: Object;
    readonly hasRules: boolean;
    for<TProperty>(propertyName: string): PropertyValidator<T, TProperty>;
    validate(value: T): void;
}
