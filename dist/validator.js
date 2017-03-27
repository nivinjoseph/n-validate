"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var n_defensive_1 = require("n-defensive");
require("n-ext");
var n_exception_1 = require("n-exception");
var Validator = (function () {
    function Validator() {
        this._propertyValidators = new Array();
        this._hasErrors = false;
        this._errors = new Object();
    }
    Object.defineProperty(Validator.prototype, "isValid", {
        get: function () { return !this._hasErrors; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validator.prototype, "hasErrors", {
        get: function () { return this._hasErrors; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validator.prototype, "errors", {
        get: function () { return this._errors; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validator.prototype, "hasRules", {
        get: function () { return this._propertyValidators.length > 0; },
        enumerable: true,
        configurable: true
    });
    Validator.prototype.for = function (propertyName) {
        var _this = this;
        n_defensive_1.default(propertyName, "propertyName")
            .ensureHasValue()
            .ensure(function (t) { return _this._propertyValidators.every(function (u) { return u.propertyName !== t; }); }, "validation already defined for property '{0}'".format(propertyName));
        var propertyValidator = new InternalPropertyValidator(propertyName);
        this._propertyValidators.push(propertyValidator);
        return propertyValidator;
    };
    Validator.prototype.validate = function (value) {
        var _this = this;
        this._hasErrors = false;
        this._errors = new Object();
        this._propertyValidators.forEach(function (t) {
            t.validate(value);
            if (t.hasError) {
                _this._hasErrors = true;
                _this._errors[t.propertyName] = t.error;
            }
        });
    };
    return Validator;
}());
exports.default = Validator;
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
            }
            if (!validationResult) {
                this._hasError = true;
                this._error = validationRule.error;
                break;
            }
        }
    };
    InternalPropertyValidator.prototype.isRequired = function () {
        this._lastValidationRule = new InternalPropertyValidationRule();
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
        this._lastValidationRule = new InternalPropertyValidationRule();
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
        this._lastValidationRule = new InternalPropertyValidationRule();
        this._lastValidationRule.ensure(propertyValidationPredicate);
        this._validationRules.push(this._lastValidationRule);
        return this;
    };
    InternalPropertyValidator.prototype.ensureT = function (valueValidationPredicate) {
        this._lastValidationRule = new InternalPropertyValidationRule();
        this._lastValidationRule.ensureT(valueValidationPredicate);
        this._validationRules.push(this._lastValidationRule);
        return this;
    };
    InternalPropertyValidator.prototype.useValidationRule = function (validationRule) {
        this._lastValidationRule = new InternalPropertyValidationRule();
        this._lastValidationRule.useValidationRule(validationRule);
        this._validationRules.push(this._lastValidationRule);
        return this;
    };
    InternalPropertyValidator.prototype.useValidator = function (validator) {
        this._lastValidationRule = new InternalPropertyValidationRule();
        this._lastValidationRule.useValidator(validator);
        this._validationRules.push(this._lastValidationRule);
        return this;
    };
    InternalPropertyValidator.prototype.if = function (conditionPredicate) {
        n_defensive_1.default(conditionPredicate, "conditionPredicate").ensureHasValue();
        if (this._lastValidationRule == null)
            throw new n_exception_1.ApplicationException("No target Validation Rule specified for the condition.");
        this._lastValidationRule.if(conditionPredicate);
        return this;
    };
    InternalPropertyValidator.prototype.withMessage = function (errorMessage) {
        n_defensive_1.default(errorMessage, "errorMessage").ensureHasValue();
        if (this._lastValidationRule == null)
            throw new n_exception_1.ApplicationException("No target Validation Rule specified for the condition.");
        this._lastValidationRule.withMessage(errorMessage);
        return this;
    };
    return InternalPropertyValidator;
}());
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
        n_defensive_1.default(tpropertyValidationPredicate, "tpropertyValidationPredicate").ensureHasValue();
        this._tpropertyValidationPredicate = tpropertyValidationPredicate;
        this._error = "Invalid value";
    };
    InternalPropertyValidationRule.prototype.ensureT = function (tValidationPredicate) {
        n_defensive_1.default(tValidationPredicate, "tValidationPredicate").ensureHasValue();
        this._tValidationPredicate = tValidationPredicate;
        this._error = "Invalid value";
    };
    InternalPropertyValidationRule.prototype.useValidationRule = function (validationRule) {
        n_defensive_1.default(validationRule, "validationRule").ensureHasValue();
        this._validationRule = validationRule;
    };
    InternalPropertyValidationRule.prototype.useValidator = function (validator) {
        n_defensive_1.default(validator, "validator").ensureHasValue();
        this._validator = validator;
    };
    InternalPropertyValidationRule.prototype.if = function (conditionPredicate) {
        n_defensive_1.default(conditionPredicate, "conditionPredicate").ensureHasValue();
        this._conditionPredicate = conditionPredicate;
    };
    InternalPropertyValidationRule.prototype.withMessage = function (errorMessage) {
        n_defensive_1.default(errorMessage, "errorMessage").ensureHasValue().ensure(function (t) { return !t.isEmptyOrWhiteSpace(); });
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
//# sourceMappingURL=validator.js.map