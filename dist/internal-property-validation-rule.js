import { given } from "@nivinjoseph/n-defensive";
import { InvalidOperationException } from "@nivinjoseph/n-exception";
// internal
export class InternalPropertyValidationRule {
    constructor() {
        this._tpropertyValidationPredicate = null;
        this._tValidationPredicate = null;
        this._validationRule = null;
        this._validator = null;
        this._conditionPredicate = null;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        this._error = null;
        this._overrideError = false;
    }
    get error() {
        if (this._validationRule != null && !this._overrideError)
            return this._validationRule.error;
        else if (this._validator != null && !this._overrideError)
            return this._validator.errors;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        else
            return typeof this._error === "function" ? this._error() : this._error;
    }
    get overrideError() { return this._overrideError; }
    ensure(tpropertyValidationPredicate) {
        given(tpropertyValidationPredicate, "tpropertyValidationPredicate").ensureHasValue();
        this._tpropertyValidationPredicate = tpropertyValidationPredicate;
        this._error = "Invalid value";
    }
    ensureT(tValidationPredicate) {
        given(tValidationPredicate, "tValidationPredicate").ensureHasValue();
        this._tValidationPredicate = tValidationPredicate;
        this._error = "Invalid value";
    }
    useValidationRule(validationRule) {
        given(validationRule, "validationRule").ensureHasValue();
        this._validationRule = validationRule;
    }
    useValidator(validator) {
        given(validator, "validator").ensureHasValue();
        this._validator = validator;
    }
    if(conditionPredicate) {
        given(conditionPredicate, "conditionPredicate").ensureHasValue();
        this._conditionPredicate = conditionPredicate;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    withMessage(errorMessage, overrideError = false) {
        given(errorMessage, "errorMessage").ensureHasValue();
        this._error = errorMessage;
        this._overrideError = overrideError;
    }
    validate(value, propertyValue) {
        if (this._conditionPredicate != null && !this._conditionPredicate(value))
            return true;
        if (this._tpropertyValidationPredicate != null)
            return this._tpropertyValidationPredicate(propertyValue);
        if (this._tValidationPredicate != null)
            return this._tValidationPredicate(value);
        if (this._validationRule != null)
            return this._validationRule.validate(propertyValue);
        if (this._validator != null) {
            this._validator.validate(propertyValue);
            return this._validator.isValid;
        }
        throw new InvalidOperationException("Validate");
    }
}
//# sourceMappingURL=internal-property-validation-rule.js.map