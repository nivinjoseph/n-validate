import { given } from "@nivinjoseph/n-defensive";
// import { ValidationInitializer } from "./validation-initializer";
// import { ValidationExecutor } from "./validation-executor";
import { InternalPropertyValidator } from "./internal-property-validator.js";
// public
export class Validator {
    get isValid() { return !this._hasErrors; }
    get hasErrors() { return this._hasErrors; }
    get errors() { return this._errors; }
    get hasRules() { return this._propertyValidators.length > 0; }
    get isEnabled() { return this._isEnabled; }
    constructor(disabled = false) {
        this._propertyValidators = new Array();
        this._errors = {};
        this._hasErrors = false;
        this._isEnabled = true;
        this._isEnabled = !disabled;
    }
    // public for<TProperty extends boolean>(propertyName: string): BooleanPropertyValidator<T>;
    // public for<TProperty extends number>(propertyName: string): NumberPropertyValidator<T>;
    // public for<TProperty extends string>(propertyName: string): StringPropertyValidator<T>;
    // public for<TProperty extends Array<any>>(propertyName: string): ArrayPropertyValidator<T>;
    // public for<TProperty extends object>(propertyName: string): ObjectPropertyValidator<T>;
    prop(propertyName) {
        given(propertyName, "propertyName")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => this._propertyValidators.every(u => u.propertyName !== t), "validation already defined for property '{0}'".format(propertyName));
        const propertyValidator = new InternalPropertyValidator(propertyName);
        this._propertyValidators.push(propertyValidator);
        this._errors[propertyName] = null;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return propertyValidator;
    }
    clearProp(propertyName) {
        given(propertyName, "propertyName").ensureHasValue().ensureIsString();
        const propertyValidator = this._propertyValidators.find(t => t.propertyName === propertyName);
        if (!propertyValidator)
            return;
        this._propertyValidators.splice(this._propertyValidators.indexOf(propertyValidator), 1);
        this._errors[propertyName] = null;
    }
    validate(value) {
        given(value, "value").ensureHasValue();
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
//# sourceMappingURL=validator.js.map