import { BaseValidationRule } from "./../base-validation-rule.js";
/**
 * Abstract base class for number validation rules.
 * Provides common functionality for validating numeric values.
 */
export class BaseNumberValidationRule extends BaseValidationRule {
    /**
     * Creates a new instance of BaseNumberValidationRule.
     * Automatically adds a type check validation rule to ensure the value is a number.
     */
    constructor() {
        super();
        this.addValidationRule({
            validate: (t) => typeof t === "number",
            error: "Invalid value"
        });
    }
}
//# sourceMappingURL=base-number-validation-rule.js.map