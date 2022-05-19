"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalPropertyValidator = void 0;
const internal_property_validation_rule_1 = require("./internal-property-validation-rule");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const n_exception_1 = require("@nivinjoseph/n-exception");
const _1 = require(".");
// internal
class InternalPropertyValidator {
    constructor(propertyName) {
        this._hasError = false;
        this._error = null;
        this._validationRules = new Array();
        this._lastValidationRule = null;
        this._conditionPredicate = null;
        this._overrideError = false;
        this._errorMessage = null;
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
        const propertyVal = value.getValue(this._propertyName);
        for (let i = 0; i < this._validationRules.length; i++) {
            const validationRule = this._validationRules[i];
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
                // this._error = this._overrideError ? this._errorMessage : validationRule.error;
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
                if (typeof propertyValue === "string") {
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
                // eslint-disable-next-line @typescript-eslint/no-throw-literal
                throw "OPTIONAL";
            if (typeof propertyValue === "string" && propertyValue.isEmptyOrWhiteSpace())
                // eslint-disable-next-line @typescript-eslint/no-throw-literal
                throw "OPTIONAL";
            return true;
        });
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    isBoolean() {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.ensure((propertyValue) => typeof propertyValue === "boolean");
        this._lastValidationRule.withMessage("Must be boolean");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    isString() {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.ensure((propertyValue) => typeof propertyValue === "string");
        this._lastValidationRule.withMessage("Must be string");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    isNumber() {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.ensure((propertyValue) => typeof propertyValue === "number");
        this._lastValidationRule.withMessage("Must be number");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    isArray() {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.ensure((propertyValue) => Array.isArray(propertyValue));
        this._lastValidationRule.withMessage("Must be array");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    isObject() {
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.ensure((propertyValue) => typeof propertyValue === "object");
        this._lastValidationRule.withMessage("Must be object");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    isType(type) {
        (0, n_defensive_1.given)(type, "type").ensureHasValue().ensureIsFunction();
        const typeName = type.getTypeName();
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.ensure((propertyValue) => propertyValue.getTypeName() === typeName);
        this._lastValidationRule.withMessage(`Must be of type ${typeName}`);
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    isInstanceOf(type) {
        (0, n_defensive_1.given)(type, "type").ensureHasValue().ensureIsFunction();
        this._lastValidationRule = new internal_property_validation_rule_1.InternalPropertyValidationRule();
        this._lastValidationRule.ensure((propertyValue) => propertyValue instanceof type);
        this._lastValidationRule.withMessage(`Must be instance of ${type.getTypeName()}`);
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
    when(conditionPredicate) {
        (0, n_defensive_1.given)(conditionPredicate, "conditionPredicate").ensureHasValue();
        if (this._lastValidationRule == null)
            this._conditionPredicate = conditionPredicate;
        else
            this._lastValidationRule.if(conditionPredicate);
        return this;
    }
    withMessage(errorMessage) {
        (0, n_defensive_1.given)(errorMessage, "errorMessage")
            .ensureHasValue();
        if (typeof errorMessage === "string") {
            (0, n_defensive_1.given)(errorMessage, "errorMessage")
                .ensureIsString()
                .ensure(t => !t.isEmptyOrWhiteSpace());
            errorMessage = errorMessage.trim();
        }
        else if (typeof errorMessage === "function") {
            (0, n_defensive_1.given)(errorMessage, "errorMessage")
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
    hasMinValue(minValue) {
        return this.useValidationRule(_1.numval.hasMinValue(minValue));
    }
    hasMaxValue(maxValue) {
        return this.useValidationRule(_1.numval.hasMaxValue(maxValue));
    }
    hasExactValue(exactValue) {
        return this.useValidationRule(_1.numval.hasExactValue(exactValue));
    }
    isInNumbers(values) {
        return this.useValidationRule(_1.numval.isIn(values));
    }
    isNotInNumbers(values) {
        return this.useValidationRule(_1.numval.isNotIn(values));
    }
    hasMinLength(minLength) {
        return this.useValidationRule(_1.strval.hasMinLength(minLength));
    }
    hasMaxLength(maxLength) {
        return this.useValidationRule(_1.strval.hasMaxLength(maxLength));
    }
    hasExactLength(exactLength) {
        return this.useValidationRule(_1.strval.hasExactLength(exactLength));
    }
    isInStrings(values, ignoreCase) {
        return this.useValidationRule(_1.strval.isIn(values, !!ignoreCase));
    }
    isNotInStrings(values, ignoreCase) {
        return this.useValidationRule(_1.strval.isNotIn(values, !!ignoreCase));
    }
    containsOnlyNumbers() {
        return this.useValidationRule(_1.strval.containsOnlyNumbers());
    }
    isPhoneNumber() {
        return this.useValidationRule(_1.strval.isPhoneNumber());
    }
    isEmail() {
        return this.useValidationRule(_1.strval.isEmail());
    }
    isDate(format) {
        return this.useValidationRule(_1.strval.isDate(format));
    }
    matchesRegex(regex) {
        return this.useValidationRule(_1.strval.matchesRegex(regex));
    }
    isEnum(enumType) {
        (0, n_defensive_1.given)(enumType, "enumType").ensureHasValue().ensureIsObject();
        const enumValues = this._getEnumValues(enumType);
        return this.useValidationRule({
            validate: (value) => enumValues.contains(value),
            error: "Invalid enum value"
        });
    }
    useCollectionValidator(validator) {
        return this.useValidationRule(new _1.CollectionValidationRule(validator));
    }
    _checkIsNumber(value) {
        if (value == null)
            return false;
        const val = value.toString().trim();
        if (value.length === 0)
            return false;
        const parsed = +val;
        return !isNaN(parsed) && isFinite(parsed);
    }
    _getEnumValues(enumType) {
        const keys = Object.keys(enumType);
        if (keys.length === 0)
            return [];
        if (this._checkIsNumber(keys[0]))
            return keys.filter(t => this._checkIsNumber(t)).map(t => +t);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return keys.map(t => enumType[t]);
    }
}
exports.InternalPropertyValidator = InternalPropertyValidator;
//# sourceMappingURL=internal-property-validator.js.map