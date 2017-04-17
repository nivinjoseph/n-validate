import { ValidationRule } from "./validation-rule";
import { Validator } from "./validator";

// public
export interface PropertyValidator<T, TProperty>
{
    isRequired(): PropertyValidator<T, TProperty>;
    isOptional(): PropertyValidator<T, TProperty>;
    ensure(validationPredicate: (propertyValue: TProperty) => boolean): PropertyValidator<T, TProperty>;
    ensureT(validationPredicate: (value: T) => boolean): PropertyValidator<T, TProperty>;
    useValidationRule(validationRule: ValidationRule<TProperty>): PropertyValidator<T, TProperty>;
    useValidator(validationRule: Validator<TProperty>): PropertyValidator<T, TProperty>;
    if(conditionPredicate: (value: T) => boolean): PropertyValidator<T, TProperty>;
    withMessage(errorMessage: string): PropertyValidator<T, TProperty>;
}