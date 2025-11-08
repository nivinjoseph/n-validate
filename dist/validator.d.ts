import { ArrayPropertyValidator, BooleanPropertyValidator, NumberPropertyValidator, ObjectPropertyValidator, PropertyValidator, StringPropertyValidator } from "./property-validator.js";
/**
 * Main validator class for creating and executing validation rules on objects.
 * @template T - The type of object being validated
 */
export declare class Validator<T> {
    private readonly _propertyValidators;
    private readonly _errors;
    private _hasErrors;
    private _isEnabled;
    /**
     * Gets whether the current validation state is valid.
     * @returns true if all validations pass, false otherwise
     */
    get isValid(): boolean;
    /**
     * Gets whether there are any validation errors.
     * @returns true if there are validation errors, false otherwise
     */
    get hasErrors(): boolean;
    /**
     * Gets the validation errors for each property.
     * @returns An object containing validation errors for each property
     */
    get errors(): {
        [key in keyof T]: any;
    };
    /**
     * Gets whether any validation rules have been defined.
     * @returns true if validation rules exist, false otherwise
     */
    get hasRules(): boolean;
    /**
     * Gets whether the validator is currently enabled.
     * @returns true if the validator is enabled, false otherwise
     */
    get isEnabled(): boolean;
    /**
     * Creates a new instance of Validator.
     * @param disabled - Whether the validator should be initially disabled
     */
    constructor(disabled?: boolean);
    /**
     * Gets a property validator for the specified property.
     * @param propertyName - The name of the property to validate
     * @returns A property validator for the specified property
     */
    prop<K extends keyof T, TProperty extends NonNullable<T[K]>>(propertyName: K): TProperty extends boolean ? BooleanPropertyValidator<T> : TProperty extends number ? NumberPropertyValidator<T> : TProperty extends string ? StringPropertyValidator<T> : TProperty extends ReadonlyArray<infer A> ? ArrayPropertyValidator<T, A> : TProperty extends object ? ObjectPropertyValidator<T, TProperty> : PropertyValidator<T, TProperty>;
    /**
     * Removes validation rules for the specified property.
     * @param propertyName - The name of the property to clear
     */
    clearProp<K extends keyof T>(propertyName: K): void;
    /**
     * Validates the given object against all defined validation rules.
     * @param value - The object to validate
     */
    validate(value: T): void;
    /**
     * Enables the validator.
     */
    enable(): void;
    /**
     * Disables the validator.
     */
    disable(): void;
}
//# sourceMappingURL=validator.d.ts.map