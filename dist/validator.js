"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
const internal_property_validator_1 = require("./internal-property-validator");
// public
class Validator {
    constructor() {
        this._propertyValidators = new Array();
        this._hasErrors = false;
        this._errors = {};
    }
    get isValid() { return !this._hasErrors; }
    get hasErrors() { return this._hasErrors; }
    get errors() { return this._errors; }
    get hasRules() { return this._propertyValidators.length > 0; }
    for(propertyName) {
        n_defensive_1.given(propertyName, "propertyName")
            .ensureHasValue()
            .ensure(t => !t.isEmptyOrWhiteSpace())
            .ensure(t => this._propertyValidators.every(u => u.propertyName !== t), "validation already defined for property '{0}'".format(propertyName));
        let propertyValidator = new internal_property_validator_1.InternalPropertyValidator(propertyName);
        this._propertyValidators.push(propertyValidator);
        return propertyValidator;
    }
    validate(value) {
        this._hasErrors = false;
        this._errors = {};
        n_defensive_1.given(value, "value")
            .ensureHasValue();
        this._propertyValidators.forEach(t => {
            t.validate(value);
            if (t.hasError) {
                this._hasErrors = true;
                this._errors[t.propertyName] = t.error;
            }
        });
    }
}
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map