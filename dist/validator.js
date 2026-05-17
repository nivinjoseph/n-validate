import { given } from "@nivinjoseph/n-defensive";
// import { ValidationInitializer } from "./validation-initializer";
// import { ValidationExecutor } from "./validation-executor";
import { InternalPropertyValidator } from "./internal-property-validator.js";
/**
 * Main validator class for creating and executing validation rules on objects.
 * @template T - The type of object being validated
 */
export class Validator {
    _propertyValidators = new Array();
    _errorsShadow = {};
    _errors = {};
    _hasErrors = false;
    _isEnabled = true;
    /**
     * Gets whether the current validation state is valid.
     * @returns true if all validations pass, false otherwise
     */
    get isValid() { return !this._hasErrors; }
    /**
     * Gets whether there are any validation errors.
     * @returns true if there are validation errors, false otherwise
     */
    get hasErrors() { return this._hasErrors; }
    /**
     * Gets the validation errors for each property.
     * @returns An object containing validation errors for each property
     */
    get errors() { return this._errors; }
    /**
     * Gets whether any validation rules have been defined.
     * @returns true if validation rules exist, false otherwise
     */
    get hasRules() { return this._propertyValidators.length > 0; }
    /**
     * Gets whether the validator is currently enabled.
     * @returns true if the validator is enabled, false otherwise
     */
    get isEnabled() { return this._isEnabled; }
    /**
     * Creates a new instance of Validator.
     * @param disabled - Whether the validator should be initially disabled
     */
    constructor(disabled = false) {
        this._isEnabled = !disabled;
    }
    // public for<TProperty extends boolean>(propertyName: string): BooleanPropertyValidator<T>;
    // public for<TProperty extends number>(propertyName: string): NumberPropertyValidator<T>;
    // public for<TProperty extends string>(propertyName: string): StringPropertyValidator<T>;
    // public for<TProperty extends Array<any>>(propertyName: string): ArrayPropertyValidator<T>;
    // public for<TProperty extends object>(propertyName: string): ObjectPropertyValidator<T>;
    /**
     * Gets a property validator for the specified property.
     * @param propertyName - The name of the property to validate
     * @returns A property validator for the specified property
     */
    prop(propertyName) {
        given(propertyName, "propertyName")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => this._propertyValidators.every(u => u.propertyName !== t), "validation already defined for property '{0}'".format(propertyName));
        const propertyValidator = new InternalPropertyValidator(propertyName);
        this._propertyValidators.push(propertyValidator);
        this._errorsShadow[propertyName] = null;
        this._errors = {
            ...this._errorsShadow
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return propertyValidator;
    }
    /**
     * Removes validation rules for the specified property.
     * @param propertyName - The name of the property to clear
     */
    clearProp(propertyName) {
        given(propertyName, "propertyName").ensureHasValue().ensureIsString();
        const propertyValidator = this._propertyValidators.find(t => t.propertyName === propertyName);
        if (!propertyValidator)
            return;
        this._propertyValidators.splice(this._propertyValidators.indexOf(propertyValidator), 1);
        const errors = {
            ...this._errors
        };
        errors[propertyName] = null;
        this._errors = errors;
    }
    /**
     * Validates the given object against all defined validation rules.
     * @param value - The object to validate
     */
    validate(value) {
        given(value, "value").ensureHasValue();
        const errors = {
            ...this._errorsShadow
        };
        let hasErrors = false;
        if (this._isEnabled) {
            this._propertyValidators.forEach(t => {
                t.validate(value);
                if (t.hasError) {
                    hasErrors = true;
                    errors[t.propertyName] = t.error;
                    return;
                }
                errors[t.propertyName] = null;
            });
        }
        else {
            this._propertyValidators.forEach(t => errors[t.propertyName] = null);
        }
        this._errors = {
            ...errors
        };
        this._hasErrors = hasErrors;
    }
    /**
     * Enables the validator.
     */
    enable() {
        this._isEnabled = true;
    }
    /**
     * Disables the validator.
     */
    disable() {
        this._isEnabled = false;
    }
}
//# sourceMappingURL=validator.js.map