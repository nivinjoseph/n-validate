"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var n_defensive_1 = require("n-defensive");
var n_exception_1 = require("n-exception");
// internal
var InternalPropertyValidationRule = (function () {
    function InternalPropertyValidationRule() {
        this._overrideError = false;
    }
    Object.defineProperty(InternalPropertyValidationRule.prototype, "error", {
        get: function () {
            if (this._validationRule != null && !this._overrideError)
                return this._validationRule.error;
            else if (this._validator != null && !this._overrideError)
                return this._validator.errors;
            else
                return this._error;
        },
        enumerable: true,
        configurable: true
    });
    InternalPropertyValidationRule.prototype.ensure = function (tpropertyValidationPredicate) {
        n_defensive_1.given(tpropertyValidationPredicate, "tpropertyValidationPredicate").ensureHasValue();
        this._tpropertyValidationPredicate = tpropertyValidationPredicate;
        this._error = "Invalid value";
    };
    InternalPropertyValidationRule.prototype.ensureT = function (tValidationPredicate) {
        n_defensive_1.given(tValidationPredicate, "tValidationPredicate").ensureHasValue();
        this._tValidationPredicate = tValidationPredicate;
        this._error = "Invalid value";
    };
    InternalPropertyValidationRule.prototype.useValidationRule = function (validationRule) {
        n_defensive_1.given(validationRule, "validationRule").ensureHasValue();
        this._validationRule = validationRule;
    };
    InternalPropertyValidationRule.prototype.useValidator = function (validator) {
        n_defensive_1.given(validator, "validator").ensureHasValue();
        this._validator = validator;
    };
    InternalPropertyValidationRule.prototype.if = function (conditionPredicate) {
        n_defensive_1.given(conditionPredicate, "conditionPredicate").ensureHasValue();
        this._conditionPredicate = conditionPredicate;
    };
    InternalPropertyValidationRule.prototype.withMessage = function (errorMessage) {
        n_defensive_1.given(errorMessage, "errorMessage").ensureHasValue().ensure(function (t) { return !t.isEmptyOrWhiteSpace(); });
        this._error = errorMessage;
        this._overrideError = true;
    };
    InternalPropertyValidationRule.prototype.validate = function (value, propertyValue) {
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
    };
    return InternalPropertyValidationRule;
}());
exports.InternalPropertyValidationRule = InternalPropertyValidationRule;
//# sourceMappingURL=internal-property-validation-rule.js.map