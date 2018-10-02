"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_property_validation_rule_1 = require("./internal-property-validation-rule");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const n_exception_1 = require("@nivinjoseph/n-exception");
require("@nivinjoseph/n-ext");
class InternalPropertyValidator {
    constructor(propertyName) {
        this._hasError = false;
        this._error = null;
        this._validationRules = new Array();
        this._lastValidationRule = null;
        this._conditionPredicate = null;
        this._overrideError = false;
        this._propertyName = propertyName;
    }
    get propertyName() { return this._propertyName; }
    get hasError() { return this._hasError; }
    get error() { return this._error; }
    validate(value) {
        this._hasError = false;
        this._error = null;
        if (this._conditionPredicate != null && !this._conditionPredicate(value))
            return;
        let propertyVal = value.getValue(this._propertyName);
        for (let i = 0; i < this._validationRules.length; i++) {
            let validationRule = this._validationRules[i];
            let validationResult = true;
            try {
                validationResult = validationRule.validate(value, propertyVal);
            }
            catch (e) {
                if (e === "OPTIONAL")
                    break;
                throw e;
            }
            if (!validationResult) {
                this._hasError = true;
                let error = validationRule.error;
                if (this._overrideError && !validationRule.overrideError)
                    error = typeof this._errorMessage === "function" ? this._errorMessage() : this._errorMessage;
                this._error = error;
                break;
            }
        }
    }
    isRequired() {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.ensure((propertyValue) => {
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
    }
    isOptional() {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.ensure((propertyValue) => {
            if (propertyValue == null)
                throw "OPTIONAL";
            if ((typeof propertyValue) === "string" && propertyValue.isEmptyOrWhiteSpace())
                throw "OPTIONAL";
            return true;
        });
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    ensureIsBoolean() {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.ensure((propertyValue) => typeof (propertyValue) === "boolean");
        this._lastValidationRule.withMessage("Must be boolean");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    ensureIsString() {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.ensure((propertyValue) => typeof (propertyValue) === "string");
        this._lastValidationRule.withMessage("Must be string");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    ensureIsNumber() {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.ensure((propertyValue) => typeof (propertyValue) === "number");
        this._lastValidationRule.withMessage("Must be number");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    ensureIsObject() {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.ensure((propertyValue) => typeof (propertyValue) === "object");
        this._lastValidationRule.withMessage("Must be object");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    ensureIsArray() {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.ensure((propertyValue) => Array.isArray(propertyValue));
        this._lastValidationRule.withMessage("Must be array");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    ensure(propertyValidationPredicate) {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.ensure(propertyValidationPredicate);
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    ensureT(valueValidationPredicate) {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.ensureT(valueValidationPredicate);
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    useValidationRule(validationRule) {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.useValidationRule(validationRule);
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    useValidator(validator) {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.useValidator(validator);
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    if(conditionPredicate) {
        n_defensive_1.given(conditionPredicate, "conditionPredicate").ensureHasValue();
        if (this._lastValidationRule == null)
            this._conditionPredicate = conditionPredicate;
        else
            this._lastValidationRule.if(conditionPredicate);
        return this;
    }
    withMessage(errorMessage) {
        n_defensive_1.given(errorMessage, "errorMessage")
            .ensureHasValue();
        if (typeof errorMessage === "string") {
            n_defensive_1.given(errorMessage, "errorMessage")
                .ensureIsString()
                .ensure(t => !t.isEmptyOrWhiteSpace());
            errorMessage = errorMessage.trim();
        }
        else if (typeof errorMessage === "function") {
            n_defensive_1.given(errorMessage, "errorMessage")
                .ensureIsFunction();
        }
        else
            throw new n_exception_1.ArgumentException("errorMessage", "has to be a string or a function that returns a string");
        if (this._lastValidationRule == null) {
            this._overrideError = true;
            this._errorMessage = errorMessage;
        }
        else
            this._lastValidationRule.withMessage(errorMessage, true);
        return this;
    }
}
exports.InternalPropertyValidator = InternalPropertyValidator;
//# sourceMappingURL=internal-property-validator.js.map