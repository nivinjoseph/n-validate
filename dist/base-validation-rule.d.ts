import { ValidationRule } from "./validation-rule.js";
/**
 * Abstract base class for creating validation rules.
 * Provides common functionality for validation rules including error handling and rule composition.
 * @template T - The type of value being validated
 */
export declare abstract class BaseValidationRule<T> implements ValidationRule<T> {
    private readonly _validationRules;
    private _error;
    /**
     * Gets the error message when validation fails.
     * @returns The error message or null if validation passed
     */
    get error(): any;
    /**
     * Validates the given value against all registered validation rules.
     * @param value - The value to validate
     * @returns true if all validation rules pass, false otherwise
     */
    validate(value: T): boolean;
    /**
     * Adds a validation rule to be checked during validation.
     * @param validationRule - The validation rule to add
     */
    protected addValidationRule(validationRule: ValidationRule<T>): void;
}
//# sourceMappingURL=base-validation-rule.d.ts.map