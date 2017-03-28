import PropertyValidator from "./property-validator";
import InternalPropertyValidationRule from "./internal-property-validation-rule";
import ValidationRule from "./validation-rule";
import Validator from "./validator";
import given from "n-defensive";
import { ApplicationException } from "n-exception";
import "n-ext";

// internal
export default class InternalPropertyValidator<T, TProperty> implements PropertyValidator<T, TProperty>
{
    private readonly _propertyName: string;
    private _hasError: boolean;
    private _error: any;
    private readonly _validationRules = new Array<InternalPropertyValidationRule<T, TProperty>>();
    private _lastValidationRule: InternalPropertyValidationRule<T, TProperty>;


    public get propertyName(): string { return this._propertyName; }
    public get hasError(): boolean { return this._hasError; }
    public get error(): string { return this._error; }


    public constructor(propertyName: string)
    {
        this._propertyName = propertyName;
    }


    public validate(value: T): void
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
                validationResult = validationRule.validate(val, propertyVal);
            } catch (e)
            {
                if (e === "OPTIONAL")
                    break;
            }

            if (!validationResult)
            {
                this._hasError = true;
                this._error = validationRule.error;
                break;
            }
        }
    }

    public isRequired(): PropertyValidator<T, TProperty>
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.ensure((propertyValue: TProperty) =>
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

        this._lastValidationRule.withMessage("Required");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }

    public isOptional(): PropertyValidator<T, TProperty>
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.ensure((propertyValue: TProperty) =>
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
        this._lastValidationRule.ensure(propertyValidationPredicate);
        this._validationRules.push(this._lastValidationRule);
        return this;
    }

    public ensureT(valueValidationPredicate: (value: T) => boolean): PropertyValidator<T, TProperty>
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.ensureT(valueValidationPredicate);
        this._validationRules.push(this._lastValidationRule);
        return this;
    }

    public useValidationRule(validationRule: ValidationRule<TProperty>): PropertyValidator<T, TProperty>
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.useValidationRule(validationRule);
        this._validationRules.push(this._lastValidationRule);
        return this;
    }

    public useValidator(validator: Validator<TProperty>): PropertyValidator<T, TProperty>
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.useValidator(validator);
        this._validationRules.push(this._lastValidationRule);
        return this;
    }

    public if(conditionPredicate: (value: T) => boolean): PropertyValidator<T, TProperty>
    {
        given(conditionPredicate, "conditionPredicate").ensureHasValue();

        if (this._lastValidationRule == null)
            throw new ApplicationException("No target Validation Rule specified for the condition.");

        this._lastValidationRule.if(conditionPredicate);

        return this;
    }

    public withMessage(errorMessage: string): PropertyValidator<T, TProperty>
    {
        given(errorMessage, "errorMessage").ensureHasValue();

        if (this._lastValidationRule == null)
            throw new ApplicationException("No target Validation Rule specified for the condition.");

        this._lastValidationRule.withMessage(errorMessage);

        return this;
    }
}