"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
const internal_property_validator_1 = require("./internal-property-validator");
class Validator {
    constructor(isEnabled = true) {
        this._propertyValidators = new Array();
        this._errors = {};
        this._hasErrors = false;
        this._isEnabled = true;
        this._isEnabled = isEnabled;
    }
    get isValid() { return !this._hasErrors; }
    get hasErrors() { return this._hasErrors; }
    get errors() { return this._errors; }
    get hasRules() { return this._propertyValidators.length > 0; }
    get isEnabled() { return this._isEnabled; }
    for(propertyName) {
        n_defensive_1.given(propertyName, "propertyName")
            .ensureHasValue()
            .ensure(t => !t.isEmptyOrWhiteSpace())
            .ensure(t => this._propertyValidators.every(u => u.propertyName !== t), "validation already defined for property '{0}'".format(propertyName));
        let propertyValidator = new internal_property_validator_1.InternalPropertyValidator(propertyName);
        this._propertyValidators.push(propertyValidator);
        this._errors[propertyName] = null;
        return propertyValidator;
    }
    validate(value) {
        n_defensive_1.given(value, "value").ensureHasValue();
        this._hasErrors = false;
        if (this._isEnabled) {
            this._propertyValidators.forEach(t => {
                t.validate(value);
                if (t.hasError) {
                    this._hasErrors = true;
                    this._errors[t.propertyName] = t.error;
                    return;
                }
                this._errors[t.propertyName] = null;
            });
        }
        else {
            this._propertyValidators.forEach(t => this._errors[t.propertyName] = null);
        }
    }
    enable() {
        this._isEnabled = true;
    }
    disable() {
        this._isEnabled = false;
    }
}
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map