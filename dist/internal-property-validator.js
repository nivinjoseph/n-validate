"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internal_property_validation_rule_1 = require("./internal-property-validation-rule");
var n_defensive_1 = require("n-defensive");
var n_exception_1 = require("n-exception");
require("n-ext");
// internal
var InternalPropertyValidator = (function () {
    function InternalPropertyValidator(propertyName) {
        this._validationRules = new Array();
        this._propertyName = propertyName;
    }
    Object.defineProperty(InternalPropertyValidator.prototype, "propertyName", {
        get: function () { return this._propertyName; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InternalPropertyValidator.prototype, "hasError", {
        get: function () { return this._hasError; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InternalPropertyValidator.prototype, "error", {
        get: function () { return this._error; },
        enumerable: true,
        configurable: true
    });
    InternalPropertyValidator.prototype.validate = function (value) {
        this._hasError = false;
        this._error = null;
        var val = value;
        var propertyVal = val.getValue(this._propertyName);
        for (var i = 0; i < this._validationRules.length; i++) {
            var validationRule = this._validationRules[i];
            var validationResult = true;
            try {
                validationResult = validationRule.validate(val, propertyVal);
            }
            catch (e) {
                if (e === "OPTIONAL")
                    break;
                throw e;
            }
            if (!validationResult) {
                this._hasError = true;
                this._error = validationRule.error;
                break;
            }
        }
    };
    InternalPropertyValidator.prototype.isRequired = function () {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.ensure(function (propertyValue) {
            if (propertyValue != null) {
                if ((typeof propertyValue) === "string") {
                    return !propertyValue.isEmptyOrWhiteSpace();
                }
                return true;
            }
            return false;
        });
        this._lastValidationRule.withMessage("Required");
        this._validationRules.push(this._lastValidationRule);
        return this;
    };
    InternalPropertyValidator.prototype.isOptional = function () {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.ensure(function (propertyValue) {
            if (propertyValue == null)
                throw "OPTIONAL";
            if ((typeof propertyValue) === "string" && propertyValue.isEmptyOrWhiteSpace())
                throw "OPTIONAL";
            return true;
        });
        this._validationRules.push(this._lastValidationRule);
        return this;
    };
    InternalPropertyValidator.prototype.ensure = function (propertyValidationPredicate) {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.ensure(propertyValidationPredicate);
        this._validationRules.push(this._lastValidationRule);
        return this;
    };
    InternalPropertyValidator.prototype.ensureT = function (valueValidationPredicate) {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.ensureT(valueValidationPredicate);
        this._validationRules.push(this._lastValidationRule);
        return this;
    };
    InternalPropertyValidator.prototype.useValidationRule = function (validationRule) {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.useValidationRule(validationRule);
        this._validationRules.push(this._lastValidationRule);
        return this;
    };
    InternalPropertyValidator.prototype.useValidator = function (validator) {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.useValidator(validator);
        this._validationRules.push(this._lastValidationRule);
        return this;
    };
    InternalPropertyValidator.prototype.if = function (conditionPredicate) {
        n_defensive_1.given(conditionPredicate, "conditionPredicate").ensureHasValue();
        if (this._lastValidationRule == null)
            throw new n_exception_1.ApplicationException("No target Validation Rule specified for the condition.");
        this._lastValidationRule.if(conditionPredicate);
        return this;
    };
    InternalPropertyValidator.prototype.withMessage = function (errorMessage) {
        n_defensive_1.given(errorMessage, "errorMessage").ensureHasValue();
        if (this._lastValidationRule == null)
            throw new n_exception_1.ApplicationException("No target Validation Rule specified for the condition.");
        this._lastValidationRule.withMessage(errorMessage);
        return this;
    };
    return InternalPropertyValidator;
}());
exports.InternalPropertyValidator = InternalPropertyValidator;
//# sourceMappingURL=internal-property-validator.js.map