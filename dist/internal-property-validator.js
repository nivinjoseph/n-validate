"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_property_validation_rule_1 = require("./internal-property-validation-rule");
const n_defensive_1 = require("n-defensive");
const n_exception_1 = require("n-exception");
require("n-ext");
// internal
class InternalPropertyValidator {
    constructor(propertyName) {
        this._validationRules = new Array();
        this._propertyName = propertyName;
    }
    get propertyName() { return this._propertyName; }
    get hasError() { return this._hasError; }
    get error() { return this._error; }
    validate(value) {
        this._hasError = false;
        this._error = null;
        let val = value;
        let propertyVal = val.getValue(this._propertyName);
        for (let i = 0; i < this._validationRules.length; i++) {
            let validationRule = this._validationRules[i];
            let validationResult = true;
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
            throw new n_exception_1.ApplicationException("No target Validation Rule specified for the condition.");
        this._lastValidationRule.if(conditionPredicate);
        return this;
    }
    withMessage(errorMessage) {
        n_defensive_1.given(errorMessage, "errorMessage").ensureHasValue();
        if (this._lastValidationRule == null)
            throw new n_exception_1.ApplicationException("No target Validation Rule specified for the condition.");
        this._lastValidationRule.withMessage(errorMessage);
        return this;
    }
}
exports.InternalPropertyValidator = InternalPropertyValidator;
//# sourceMappingURL=internal-property-validator.js.map