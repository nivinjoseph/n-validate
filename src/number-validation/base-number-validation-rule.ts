import { BaseValidationRule } from "./../base-validation-rule.js";

/**
 * Abstract base class for number validation rules.
 * Provides common functionality for validating numeric values.
 */
export abstract class BaseNumberValidationRule extends BaseValidationRule<number>
{
    /**
     * Creates a new instance of BaseNumberValidationRule.
     * Automatically adds a type check validation rule to ensure the value is a number.
     */
    public constructor()
    {
        super();
        this.addValidationRule(
            {
                validate: (t: number) => typeof t === "number",
                error: "Invalid value"
            });
    }
}