import given from "n-defensive";
import "n-ext";
import PropertyValidator from "./property-validator";
import ValidationInitializer from "./validation-initializer";
import ValidationExecutor from "./validation-executor";
import InternalPropertyValidator from "./internal-property-validator";

// public
export default class Validator<T> implements ValidationInitializer<T>, ValidationExecutor<T>
{
    private _propertyValidators = new Array<InternalPropertyValidator<T, any>>();
    private _hasErrors = false;
    private _errors = new Object();

    public get isValid(): boolean { return !this._hasErrors; }
    public get hasErrors(): boolean { return this._hasErrors; }
    public get errors(): Object { return this._errors; }
    public get hasRules(): boolean { return this._propertyValidators.length > 0; }


    public for<TProperty>(propertyName: string): PropertyValidator<T, TProperty>
    {
        given(propertyName, "propertyName")
            .ensureHasValue()
            .ensure(t => this._propertyValidators.every(u => u.propertyName !== t),
            "validation already defined for property '{0}'".format(propertyName));

        let propertyValidator = new InternalPropertyValidator<T, TProperty>(propertyName);
        this._propertyValidators.push(propertyValidator);
        return propertyValidator;
    }

    public validate(value: T): void 
    {
        this._hasErrors = false;
        this._errors = new Object();

        this._propertyValidators.forEach(t =>
        {
            t.validate(value);
            if (t.hasError)
            {
                this._hasErrors = true;
                this._errors[t.propertyName] = t.error;
            }
        });
    }
}