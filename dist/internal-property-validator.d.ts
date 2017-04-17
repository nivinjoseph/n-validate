import { PropertyValidator } from "./property-validator";
import { ValidationRule } from "./validation-rule";
import { Validator } from "./validator";
import "n-ext";
export declare class InternalPropertyValidator<T, TProperty> implements PropertyValidator<T, TProperty> {
    private readonly _propertyName;
    private _hasError;
    private _error;
    private readonly _validationRules;
    private _lastValidationRule;
    readonly propertyName: string;
    readonly hasError: boolean;
    readonly error: string;
    constructor(propertyName: string);
    validate(value: T): void;
    isRequired(): PropertyValidator<T, TProperty>;
    isOptional(): PropertyValidator<T, TProperty>;
    ensure(propertyValidationPredicate: (propertyValue: TProperty) => boolean): PropertyValidator<T, TProperty>;
    ensureT(valueValidationPredicate: (value: T) => boolean): PropertyValidator<T, TProperty>;
    useValidationRule(validationRule: ValidationRule<TProperty>): PropertyValidator<T, TProperty>;
    useValidator(validator: Validator<TProperty>): PropertyValidator<T, TProperty>;
    if(conditionPredicate: (value: T) => boolean): PropertyValidator<T, TProperty>;
    withMessage(errorMessage: string): PropertyValidator<T, TProperty>;
}
