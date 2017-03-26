import given from "n-defensive";
import "n-ext";
import PropertyValidator from "./property-validator";
import ValidationRule from "./validation-rule";
import { ApplicationException, InvalidOperationException } from "n-exception";
import ValidationInitializer from "./validation-initializer";
import ValidationExecutor from "./validation-executor";

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
            .ensure(t => this._propertyValidators.every(u => u.PropertyName !== t),
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
            t.Validate(value);
            if (t.HasError)
            {
                this._hasErrors = true;
                this._errors[t.PropertyName] = t.Error;
            }
        });
    }
}

class InternalPropertyValidator<T, TProperty> implements PropertyValidator<T, TProperty>
{
    private _propertyName: string;
    private _hasError: boolean;
    private _error: any;
    private readonly _validationRules = new Array<InternalPropertyValidationRule<T, TProperty>>();
    private _lastValidationRule: InternalPropertyValidationRule<T, TProperty>;


    public get PropertyName(): string { return this._propertyName; }
    public get HasError(): boolean { return this._hasError; }
    public get Error(): string { return this._error; }


    public constructor(propertyName: string)
    {
        this._propertyName = propertyName;
    }


    public Validate(value: T): void
    {
        this._hasError = false;
        this._error = null;

        let val = <T>value;
        let propertyVal = (<Object>val).getValue(this._propertyName);


        for (let i = 0; i < this._validationRules.length; i++)
        {
            let validationRule = this._validationRules[i];
            let validationResult = true;

            try
            {
                validationResult = validationRule.Validate(val, propertyVal);
            } catch (e)
            {
                if (e === "OPTIONAL")
                    break;
            }

            if (!validationResult)
            {
                this._hasError = true;
                this._error = validationRule.Error;
                break;
            }
        }
    }

    public isRequired(): PropertyValidator<T, TProperty>
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.Ensure((propertyValue: TProperty) =>
        {
            if (propertyValue != null)
            {
                if ((typeof propertyValue) === "string")
                {
                    return !(<string>(<any>propertyValue)).isEmptyOrWhiteSpace();
                }
                return true;
            }
            return false;
        });

        this._lastValidationRule.WithMessage("Required");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }

    public isOptional(): PropertyValidator<T, TProperty>
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.Ensure((propertyValue: TProperty) =>
        {
            if (propertyValue == null)
                throw "OPTIONAL";

            if ((typeof propertyValue) === "string" && (<string>(<any>propertyValue)).isEmptyOrWhiteSpace())
                throw "OPTIONAL";

            return true;
        });

        this._validationRules.push(this._lastValidationRule);
        return this;
    }

    public ensure(propertyValidationPredicate: (propertyValue: TProperty) => boolean): PropertyValidator<T, TProperty>
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.Ensure(propertyValidationPredicate);
        this._validationRules.push(this._lastValidationRule);
        return this;
    }

    public ensureT(valueValidationPredicate: (value: T) => boolean): PropertyValidator<T, TProperty>
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.EnsureT(valueValidationPredicate);
        this._validationRules.push(this._lastValidationRule);
        return this;
    }

    public useValidationRule(validationRule: ValidationRule<TProperty>): PropertyValidator<T, TProperty>
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.UseValidationRule(validationRule);
        this._validationRules.push(this._lastValidationRule);
        return this;
    }

    public useValidator(validator: Validator<TProperty>): PropertyValidator<T, TProperty>
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.UseValidator(validator);
        this._validationRules.push(this._lastValidationRule);
        return this;
    }

    public if(conditionPredicate: (value: T) => boolean): PropertyValidator<T, TProperty>
    {
        given(conditionPredicate, "conditionPredicate").ensureHasValue();
        
        if (this._lastValidationRule == null)
            throw new ApplicationException("No target Validation Rule specified for the condition.");

        this._lastValidationRule.If(conditionPredicate);

        return this;
    }

    public withMessage(errorMessage: string): PropertyValidator<T, TProperty>
    {
        given(errorMessage, "errorMessage").ensureHasValue();
        
        if (this._lastValidationRule == null)
            throw new ApplicationException("No target Validation Rule specified for the condition.");

        this._lastValidationRule.WithMessage(errorMessage);

        return this;
    }
}

class InternalPropertyValidationRule<T, TProperty>
{
    private _tpropertyValidationPredicate: (propertyValue: TProperty) => boolean;
    private _tValidationPredicate: (value: T) => boolean;
    private _validationRule: ValidationRule<TProperty>;
    private _validator: Validator<TProperty>;
    private _conditionPredicate: (value: T) => boolean;
    private _error: string;
    private _overrideError = false;


    public get Error(): Object
    {
        if (this._validationRule != null && !this._overrideError)
            return this._validationRule.error;
        else if (this._validator != null && !this._overrideError)
            return this._validator.errors;
        else return this._error;
    }


    public Ensure(tpropertyValidationPredicate: (propertyValue: TProperty) => boolean): void
    {
        given(tpropertyValidationPredicate, "tpropertyValidationPredicate").ensureHasValue();

        this._tpropertyValidationPredicate = tpropertyValidationPredicate;
        this._error = "Invalid value";
    }

    public EnsureT(tValidationPredicate: (value: T) => boolean): void
    {    
        given(tValidationPredicate, "tValidationPredicate").ensureHasValue();
        
        this._tValidationPredicate = tValidationPredicate;
        this._error = "Invalid value";
    }

    public UseValidationRule(validationRule: ValidationRule<TProperty>): void
    {
        given(validationRule, "validationRule").ensureHasValue();

        this._validationRule = validationRule;
    }

    public UseValidator(validator: Validator<TProperty>): void
    {
        given(validator, "validator").ensureHasValue();
        
        this._validator = validator;
    }

    public If(conditionPredicate: (value: T) => boolean): void
    {
        given(conditionPredicate, "conditionPredicate").ensureHasValue();
        
        this._conditionPredicate = conditionPredicate;
    }

    public WithMessage(errorMessage: string): void
    {
        given(errorMessage, "errorMessage").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());

        this._error = errorMessage;
        this._overrideError = true;
    }

    public Validate(value: T, propertyValue: TProperty): boolean
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