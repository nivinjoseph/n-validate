import { ValidationRule } from "./validation-rule";
import { Validator } from "./validator";
import { given } from "@nivinjoseph/n-defensive";
import { InvalidOperationException } from "@nivinjoseph/n-exception";

// internal
export class InternalPropertyValidationRule<T, TProperty>
{
    private _tpropertyValidationPredicate: (propertyValue: TProperty) => boolean = null;
    private _tValidationPredicate: (value: T) => boolean = null;
    private _validationRule: ValidationRule<TProperty> = null;
    private _validator: Validator<TProperty> = null;
    private _conditionPredicate: (value: T) => boolean = null;
    private _error: string;
    private _overrideError = false;


    public get error(): Object
    {
        if (this._validationRule != null && !this._overrideError)
            return this._validationRule.error;
        else if (this._validator != null && !this._overrideError)
            return this._validator.errors;
        else return this._error;
    }


    public ensure(tpropertyValidationPredicate: (propertyValue: TProperty) => boolean): void
    {
        given(tpropertyValidationPredicate, "tpropertyValidationPredicate").ensureHasValue();

        this._tpropertyValidationPredicate = tpropertyValidationPredicate;
        this._error = "Invalid value";
    }

    public ensureT(tValidationPredicate: (value: T) => boolean): void
    {
        given(tValidationPredicate, "tValidationPredicate").ensureHasValue();

        this._tValidationPredicate = tValidationPredicate;
        this._error = "Invalid value";
    }

    public useValidationRule(validationRule: ValidationRule<TProperty>): void
    {
        given(validationRule, "validationRule").ensureHasValue();

        this._validationRule = validationRule;
    }

    public useValidator(validator: Validator<TProperty>): void
    {
        given(validator, "validator").ensureHasValue();

        this._validator = validator;
    }

    public if(conditionPredicate: (value: T) => boolean): void
    {
        given(conditionPredicate, "conditionPredicate").ensureHasValue();

        this._conditionPredicate = conditionPredicate;
    }

    public withMessage(errorMessage: string): void
    {
        given(errorMessage, "errorMessage").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());

        this._error = errorMessage;
        this._overrideError = true;
    }

    public validate(value: T, propertyValue: TProperty): boolean
    {
        if (this._conditionPredicate != null && !this._conditionPredicate(value))
            return true;

        if (this._tpropertyValidationPredicate != null)
            return this._tpropertyValidationPredicate(propertyValue);

        if (this._tValidationPredicate != null)
            return this._tValidationPredicate(value);

        if (this._validationRule != null)
            return this._validationRule.validate(propertyValue);

        if (this._validator != null)
        {
            this._validator.validate(propertyValue);
            return this._validator.isValid;
        }

        throw new InvalidOperationException("Validate");
    }
}