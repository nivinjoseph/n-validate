"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const n_exception_1 = require("@nivinjoseph/n-exception");
class InternalPropertyValidationRule {
    constructor() {
        this._tpropertyValidationPredicate = null;
        this._tValidationPredicate = null;
        this._validationRule = null;
        this._validator = null;
        this._conditionPredicate = null;
        this._overrideError = false;
    }
    get error() {
        if (this._validationRule != null && !this._overrideError)
            return this._validationRule.error;
        else if (this._validator != null && !this._overrideError)
            return this._validator.errors;
        else
            return typeof this._error === "function" ? this._error() : this._error;
    }
    get overrideError() { return this._overrideError; }
    ensure(tpropertyValidationPredicate) {
        n_defensive_1.given(tpropertyValidationPredicate, "tpropertyValidationPredicate").ensureHasValue();
        this._tpropertyValidationPredicate = tpropertyValidationPredicate;
        this._error = "Invalid value";
    }
    ensureT(tValidationPredicate) {
        n_defensive_1.given(tValidationPredicate, "tValidationPredicate").ensureHasValue();
        this._tValidationPredicate = tValidationPredicate;
        this._error = "Invalid value";
    }
    useValidationRule(validationRule) {
        n_defensive_1.given(validationRule, "validationRule").ensureHasValue();
        this._validationRule = validationRule;
    }
    useValidator(validator) {
        n_defensive_1.given(validator, "validator").ensureHasValue();
        this._validator = validator;
    }
    if(conditionPredicate) {
        n_defensive_1.given(conditionPredicate, "conditionPredicate").ensureHasValue();
        this._conditionPredicate = conditionPredicate;
    }
    withMessage(errorMessage, overrideError = false) {
        n_defensive_1.given(errorMessage, "errorMessage").ensureHasValue();
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
        throw new n_exception_1.InvalidOperationException("Validate");
    }
}
exports.InternalPropertyValidationRule = InternalPropertyValidationRule;
//# sourceMappingURL=internal-property-validation-rule.js.map