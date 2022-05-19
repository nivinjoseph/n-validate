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
    useValidator(validator: Validator<TProperty>): this;
    
    ensureT(validationPredicate: (value: T) => boolean): this;
    when(conditionPredicate: (value: T) => boolean): this;
    withMessage(errorMessage: string | Function): this;
}

export interface BooleanPropertyValidator<T> extends PropertyValidator<T, boolean>
{
    isBoolean(): this;
}

export interface NumberPropertyValidator<T> extends PropertyValidator<T, number>
{
    isNumber(): this;
    hasMinValue(minValue: number): this;
    hasMaxValue(maxValue: number): this;
    hasExactValue(exactValue: number): this;
    isInNumbers(values: ReadonlyArray<number>): this;
    isNotInNumbers(values: ReadonlyArray<number>): this;
    isEnum(enumType: object): this;
}

export interface StringPropertyValidator<T> extends PropertyValidator<T, string>
{
    isString(): this;
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
    matchesRegex(regex: RegExp): this;
    isEnum(enumType: object): this;
}

export interface ArrayPropertyValidator<T, A> extends PropertyValidator<T, ReadonlyArray<A>>
{
    isArray(): this;
    useCollectionValidator(validator: Validator<A>): this;
}

export interface ObjectPropertyValidator<T, O> extends PropertyValidator<T, O>
{
    isObject(): this;
    isType(type: new (...args: Array<any>) => O): this;
    isInstanceOf(type: Function & { prototype: O; }): this;
}