"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
// import { ValidationInitializer } from "./validation-initializer";
// import { ValidationExecutor } from "./validation-executor";
const internal_property_validator_1 = require("./internal-property-validator");
// public
class Validator {
    constructor(disabled = false) {
        this._propertyValidators = new Array();
        this._errors = {};
        this._hasErrors = false;
        this._isEnabled = true;
        this._isEnabled = !disabled;
    }
    get isValid() { return !this._hasErrors; }
    get hasErrors() { return this._hasErrors; }
    get errors() { return this._errors; }
    get hasRules() { return this._propertyValidators.length > 0; }
    get isEnabled() { return this._isEnabled; }
    // public for<TProperty extends boolean>(propertyName: string): BooleanPropertyValidator<T>;
    // public for<TProperty extends number>(propertyName: string): NumberPropertyValidator<T>;
    // public for<TProperty extends string>(propertyName: string): StringPropertyValidator<T>;
    // public for<TProperty extends Array<any>>(propertyName: string): ArrayPropertyValidator<T>;
    // public for<TProperty extends object>(propertyName: string): ObjectPropertyValidator<T>;
    prop(propertyName) {
        (0, n_defensive_1.given)(propertyName, "propertyName")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => this._propertyValidators.every(u => u.propertyName !== t), "validation already defined for property '{0}'".format(propertyName));
        const propertyValidator = new internal_property_validator_1.InternalPropertyValidator(propertyName);
        this._propertyValidators.push(propertyValidator);
        this._errors[propertyName] = null;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return propertyValidator;
    }
    clearProp(propertyName) {
        (0, n_defensive_1.given)(propertyName, "propertyName").ensureHasValue().ensureIsString();
        const propertyValidator = this._propertyValidators.find(t => t.propertyName === propertyName);
        if (!propertyValidator)
            return;
        this._propertyValidators.splice(this._propertyValidators.indexOf(propertyValidator), 1);
        this._errors[propertyName] = null;
    }
    validate(value) {
        (0, n_defensive_1.given)(value, "value").ensureHasValue();
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