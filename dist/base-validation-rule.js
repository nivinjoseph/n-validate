/**
 * Abstract base class for creating validation rules.
 * Provides common functionality for validation rules including error handling and rule composition.
 * @template T - The type of value being validated
 */
export class BaseValidationRule {
    constructor() {
        this._validationRules = new Array();
        this._error = null;
    }
    /**
     * Gets the error message when validation fails.
     * @returns The error message or null if validation passed
     */
    get error() { return this._error; }
    /**
     * Validates the given value against all registered validation rules.
     * @param value - The value to validate
     * @returns true if all validation rules pass, false otherwise
     */
    validate(value) {
        this._error = null;
        for (let i = 0; i < this._validationRules.length; i++) {
            if (this._validationRules[i].validate(value))
                continue;
            this._error = this._validationRules[i].error;
            return false;
        }
        return true;
    }
    /**
     * Adds a validation rule to be checked during validation.
     * @param validationRule - The validation rule to add
     */
    addValidationRule(validationRule) {
        this._validationRules.push(validationRule);
    }
}
//# sourceMappingURL=base-validation-rule.js.map