import { BaseValidationRule } from "./../base-validation-rule.js";
/**
 * Abstract base class for string validation rules.
 * Provides common functionality for validating string values.
 */
export declare abstract class BaseStringValidationRule extends BaseValidationRule<string> {
    /**
     * Creates a new instance of BaseStringValidationRule.
     * Automatically adds a type check validation rule to ensure the value is a string.
     */
    protected constructor();
    /**
     * Checks if a value can be converted to a number.
     * @param value - The value to check
     * @returns true if the value can be converted to a number, false otherwise
     */
    protected isNumber(value: unknown): boolean;
}
//# sourceMappingURL=base-string-validation-rule.d.ts.map