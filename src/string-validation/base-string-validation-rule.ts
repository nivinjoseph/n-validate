import { BaseValidationRule } from "./../base-validation-rule.js";

/**
 * Abstract base class for string validation rules.
 * Provides common functionality for validating string values.
 */
export abstract class BaseStringValidationRule extends BaseValidationRule<string>
{
    /**
     * Creates a new instance of BaseStringValidationRule.
     * Automatically adds a type check validation rule to ensure the value is a string.
     */
    protected constructor()
    {
        super();
        this.addValidationRule(
            {
                validate: t => typeof t === "string",
                error: "Invalid value"
            });
    }

    /**
     * Checks if a value can be converted to a number.
     * @param value - The value to check
     * @returns true if the value can be converted to a number, false otherwise
     */
    protected isNumber(value: unknown): boolean
    {
        const val = (<object>value).toString().trim();
        if (val.length === 0)
            return false;
        const parsed = +val;
        return !isNaN(parsed) && isFinite(parsed);
    }
}