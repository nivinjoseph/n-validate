import { ValidationRule } from "./validation-rule";
import { Validator } from "./validator";

// public
export interface PropertyValidator<T, TProperty>
{
    isRequired(): this;
    isOptional(): this;
    // ensureIsBoolean(): PropertyValidator<T, TProperty>;
    // ensureIsString(): PropertyValidator<T, TProperty>;
    // ensureIsNumber(): PropertyValidator<T, TProperty>;
    // ensureIsObject(): PropertyValidator<T, TProperty>;
    // ensureIsArray(): PropertyValidator<T, TProperty>;
    
    ensure(validationPredicate: (propertyValue: TProperty) => boolean): this;
    useValidationRule(validationRule: ValidationRule<TProperty>): this;
    useValidator(validationRule: Validator<TProperty>): this;
    
    ensureT(validationPredicate: (value: T) => boolean): this;
    if(conditionPredicate: (value: T) => boolean): this;
    withMessage(errorMessage: string | Function): this;
}

export interface BooleanPropertyValidator<T> extends PropertyValidator<T, boolean>
{
    ensureIsBoolean(): this;
}

export interface NumberPropertyValidator<T> extends PropertyValidator<T, number>
{
    ensureIsNumber(): this;
    hasMinValue(minValue: number): this;
    hasMaxValue(maxValue: number): this;
    hasExactValue(exactValue: number): this;
    isInNumbers(values: ReadonlyArray<number>): this;
    isNotInNumbers(values: ReadonlyArray<number>): this;
}

export interface StringPropertyValidator<T> extends PropertyValidator<T, string>
{
    ensureIsString(): this;
    hasMinLength(minLength: number): this;
    hasMaxLength(maxLength: number): this;
    hasExactLength(exactLength: number): this;
    isInStrings(values: ReadonlyArray<string>, ignoreCase?: boolean): this;
    isNotInStrings(values: ReadonlyArray<string>, ignoreCase?: boolean): this;
    containsOnlyNumbers(): this;
    isPhoneNumber(): this;
    isEmail(): this;
    /**
     * 
     * @param format eg: YYYY-MM-DD
     */
    isDate(format: string): this;
}

export interface ArrayPropertyValidator<T> extends PropertyValidator<T, Array<any>>
{
    ensureIsArray(): this;
    useCollectionValidator(validator: Validator<any>): this;
}

export interface ObjectPropertyValidator<T> extends PropertyValidator<T, object>
{
    ensureIsObject(): this;
}