import { ValidationRule } from "./validation-rule.js";
import { Validator } from "./validator.js";

/**
 * Interface for property validation with fluent API.
 * @template T - The type of object containing the property
 * @template TProperty - The type of the property being validated
 */
export interface PropertyValidator<T, TProperty>
{
    /**
     * Marks the property as required.
     * @returns The property validator for method chaining
     */
    isRequired(): this;

    /**
     * Marks the property as optional.
     * @returns The property validator for method chaining
     */
    isOptional(): this;
    // ensureIsBoolean(): PropertyValidator<T, TProperty>;
    // ensureIsString(): PropertyValidator<T, TProperty>;
    // ensureIsNumber(): PropertyValidator<T, TProperty>;
    // ensureIsObject(): PropertyValidator<T, TProperty>;
    // ensureIsArray(): PropertyValidator<T, TProperty>;

    /**
     * Adds a custom validation predicate for the property value.
     * @param validationPredicate - The predicate function that validates the property value
     * @returns The property validator for method chaining
     */
    ensure(validationPredicate: (propertyValue: TProperty) => boolean): this;

    /**
     * Adds a validation rule for the property.
     * @param validationRule - The validation rule to apply
     * @returns The property validator for method chaining
     */
    useValidationRule(validationRule: ValidationRule<TProperty>): this;

    /**
     * Adds a validator for the property.
     * @param validator - The validator to apply
     * @returns The property validator for method chaining
     */
    useValidator(validator: Validator<TProperty>): this;

    /**
     * Adds a custom validation predicate that has access to the entire object.
     * @param validationPredicate - The predicate function that validates using the entire object
     * @returns The property validator for method chaining
     */
    ensureT(validationPredicate: (value: T) => boolean): this;

    /**
     * Adds a condition that determines whether validation rules should be executed.
     * When used right after prop(), it determines whether any validation rules for that property will be executed.
     * When used after a specific rule, it determines whether that particular rule should be executed.
     * @param conditionPredicate - The predicate function that determines if validation should occur
     * @returns The property validator for method chaining
     * @example
     * ```typescript
     * // Skip all validation rules for a property
     * validator.prop("email")
     *     .when(user => user.contactPreference === "email") // Skips all email validations if false
     *     .isRequired()
     *     .isEmail()
     *     .withMessage("Please provide a valid email address");
     * 
     * // Apply when() to specific rules
     * validator.prop("phone")
     *     .isRequired()
     *     .isPhoneNumber()
     *     .when(user => user.contactPreference === "phone") // Only applies to isPhoneNumber()
     *     .withMessage("Please provide a valid phone number");
     * ```
     */
    when(conditionPredicate: (value: T) => boolean): this;

    /**
     * Sets a custom error message for validation failures.
     * This message will be used instead of the default error message when validation fails.
     * The message can be either a static string or a function that returns a string.
     * @param errorMessage - The error message or function that returns an error message
     * @returns The property validator for method chaining
     * @example
     * ```typescript
     * validator.prop("age")
     *     .isRequired()
     *     .hasMinValue(18)
     *     .withMessage("User must be at least 18 years old");
     * 
     * validator.prop("email")
     *     .isRequired()
     *     .isEmail()
     *     .withMessage(value => `Invalid email format: ${value}`);
     * ```
     */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    withMessage(errorMessage: string | Function): this;
}

/**
 * Interface for boolean property validation.
 * @template T - The type of object containing the property
 */
export interface BooleanPropertyValidator<T> extends PropertyValidator<T, boolean>
{
    /**
     * Ensures the property is a boolean value.
     * @returns The property validator for method chaining
     */
    isBoolean(): this;
}

/**
 * Interface for number property validation.
 * @template T - The type of object containing the property
 */
export interface NumberPropertyValidator<T> extends PropertyValidator<T, number>
{
    /**
     * Ensures the property is a number value.
     * @returns The property validator for method chaining
     */
    isNumber(): this;

    /**
     * Ensures the property value is greater than or equal to the specified minimum.
     * @param minValue - The minimum allowed value
     * @returns The property validator for method chaining
     */
    hasMinValue(minValue: number): this;

    /**
     * Ensures the property value is less than or equal to the specified maximum.
     * @param maxValue - The maximum allowed value
     * @returns The property validator for method chaining
     */
    hasMaxValue(maxValue: number): this;

    /**
     * Ensures the property value equals the specified exact value.
     * @param exactValue - The exact value required
     * @returns The property validator for method chaining
     */
    hasExactValue(exactValue: number): this;

    /**
     * Ensures the property value is in the specified set of values.
     * @param values - The set of allowed values
     * @returns The property validator for method chaining
     */
    isInNumbers(values: ReadonlyArray<number>): this;

    /**
     * Ensures the property value is not in the specified set of values.
     * @param values - The set of disallowed values
     * @returns The property validator for method chaining
     */
    isNotInNumbers(values: ReadonlyArray<number>): this;

    /**
     * Ensures the property value is a valid enum value.
     * @param enumType - The enum type to validate against
     * @returns The property validator for method chaining
     */
    isEnum(enumType: object): this;
}

/**
 * Interface for string property validation.
 * @template T - The type of object containing the property
 */
export interface StringPropertyValidator<T> extends PropertyValidator<T, string>
{
    /**
     * Ensures the property is a string value.
     * @returns The property validator for method chaining
     */
    isString(): this;

    /**
     * Ensures the property value has a length greater than or equal to the specified minimum.
     * @param minLength - The minimum allowed length
     * @returns The property validator for method chaining
     */
    hasMinLength(minLength: number): this;

    /**
     * Ensures the property value has a length less than or equal to the specified maximum.
     * @param maxLength - The maximum allowed length
     * @returns The property validator for method chaining
     */
    hasMaxLength(maxLength: number): this;

    /**
     * Ensures the property value has the exact specified length.
     * @param exactLength - The exact length required
     * @returns The property validator for method chaining
     */
    hasExactLength(exactLength: number): this;

    /**
     * Ensures the property value is in the specified set of values.
     * @param values - The set of allowed values
     * @param ignoreCase - Whether to ignore case when comparing values
     * @returns The property validator for method chaining
     */
    isInStrings(values: ReadonlyArray<string>, ignoreCase?: boolean): this;

    /**
     * Ensures the property value is not in the specified set of values.
     * @param values - The set of disallowed values
     * @param ignoreCase - Whether to ignore case when comparing values
     * @returns The property validator for method chaining
     */
    isNotInStrings(values: ReadonlyArray<string>, ignoreCase?: boolean): this;

    /**
     * Ensures the property value contains only numeric characters.
     * @returns The property validator for method chaining
     */
    containsOnlyNumbers(): this;

    /**
     * Ensures the property value is a valid phone number.
     * @returns The property validator for method chaining
     */
    isPhoneNumber(): this;

    /**
     * Ensures the property value is a valid email address.
     * @returns The property validator for method chaining
     */
    isEmail(): this;

    /**
     * Ensures the property value is a valid date string in the specified format.
     * The format string uses Luxon date format tokens.
     * See https://moment.github.io/luxon/#/formatting?id=table-of-tokens for available tokens.
     * @param format - The expected date format using Luxon tokens (e.g., "yyyy-MM-dd", "MM/dd/yyyy", "dd LLL yyyy")
     * @returns The property validator for method chaining
     * @example
     * ```typescript
     * validator.prop("birthDate")
     *     .isRequired()
     *     .isDate("yyyy-MM-dd")
     *     .withMessage("Birth date must be in YYYY-MM-DD format");
     * 
     * validator.prop("expiryDate")
     *     .isRequired()
     *     .isDate("MM/dd/yyyy")
     *     .withMessage("Expiry date must be in MM/DD/YYYY format");
     * ```
     */
    isDate(format: string): this;

    /**
     * Ensures the property value matches the specified regular expression.
     * @param regex - The regular expression to match against
     * @returns The property validator for method chaining
     */
    matchesRegex(regex: RegExp): this;

    /**
     * Ensures the property value is a valid enum value.
     * @param enumType - The enum type to validate against
     * @returns The property validator for method chaining
     */
    isEnum(enumType: object): this;
}

/**
 * Interface for array property validation.
 * @template T - The type of object containing the property
 * @template A - The type of elements in the array
 */
export interface ArrayPropertyValidator<T, A> extends PropertyValidator<T, ReadonlyArray<A>>
{
    /**
     * Ensures the property is an array.
     * @returns The property validator for method chaining
     */
    isArray(): this;

    /**
     * Adds a validator for the array elements.
     * @param validator - The validator to apply to each element
     * @returns The property validator for method chaining
     */
    useCollectionValidator(validator: Validator<A>): this;
}

/**
 * Interface for object property validation.
 * @template T - The type of object containing the property
 * @template O - The type of the object property
 */
export interface ObjectPropertyValidator<T, O> extends PropertyValidator<T, O>
{
    /**
     * Ensures the property is an object.
     * @returns The property validator for method chaining
     */
    isObject(): this;

    /**
     * Ensures the property is of the specified type.
     * @param type - The expected type constructor
     * @returns The property validator for method chaining
     */
    isType(type: new (...args: Array<any>) => O): this;

    /**
     * Ensures the property is an instance of the specified type.
     * @param type - The type to check against
     * @returns The property validator for method chaining
     */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    isInstanceOf(type: Function & { prototype: O; }): this;
}