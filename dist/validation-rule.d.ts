/**
 * Interface defining the contract for validation rules.
 * @template T - The type of value being validated
 */
export interface ValidationRule<T> {
    /**
     * Gets the error message when validation fails.
     * @returns The error message or object describing the validation failure
     */
    error: any;
    /**
     * Validates the given value.
     * @param value - The value to validate
     * @returns true if validation passes, false otherwise
     */
    validate(value: T): boolean;
}
//# sourceMappingURL=validation-rule.d.ts.map