import { PropertyValidator } from "./property-validator";
import { InternalPropertyValidationRule } from "./internal-property-validation-rule";
import { ValidationRule } from "./validation-rule";
import { Validator } from "./validator";
import { given } from "@nivinjoseph/n-defensive";
import { ArgumentException } from "@nivinjoseph/n-exception";
import "@nivinjoseph/n-ext";

// internal
export class InternalPropertyValidator<T, TProperty> implements PropertyValidator<T, TProperty>
{
    private readonly _propertyName: string;
    private _hasError: boolean = false;
    private _error: any = null;
    private readonly _validationRules = new Array<InternalPropertyValidationRule<T, TProperty>>();
    private _lastValidationRule: InternalPropertyValidationRule<T, TProperty> = null;
    private _conditionPredicate: (value: T) => boolean = null;
    private _overrideError = false;
    private _errorMessage: string | Function;


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
        
        if (this._conditionPredicate != null && !this._conditionPredicate(value))
            return;
        
        let propertyVal = (<Object>value).getValue(this._propertyName);

        for (let i = 0; i < this._validationRules.length; i++)
        {
            let validationRule = this._validationRules[i];
            let validationResult = true;

            try
            {
                validationResult = validationRule.validate(value, propertyVal);
            }
            catch (e)
            {
                if (e === "OPTIONAL")
                    break;

                throw e;
            }

            if (!validationResult)
            {
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
    
    public ensureIsBoolean(): PropertyValidator<T, TProperty>
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.ensure((propertyValue: TProperty) => typeof(propertyValue) === "boolean");

        this._lastValidationRule.withMessage("Must be boolean");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    
    public ensureIsString(): PropertyValidator<T, TProperty>
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.ensure((propertyValue: TProperty) => typeof (propertyValue) === "string");

        this._lastValidationRule.withMessage("Must be string");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    
    public ensureIsNumber(): PropertyValidator<T, TProperty>
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.ensure((propertyValue: TProperty) => typeof (propertyValue) === "number");

        this._lastValidationRule.withMessage("Must be number");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    
    public ensureIsObject(): PropertyValidator<T, TProperty>
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.ensure((propertyValue: TProperty) => typeof (propertyValue) === "object");

        this._lastValidationRule.withMessage("Must be object");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    
    public ensureIsArray(): PropertyValidator<T, TProperty>
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.ensure((propertyValue: TProperty) => Array.isArray(propertyValue));

        this._lastValidationRule.withMessage("Must be array");
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
            this._conditionPredicate = conditionPredicate;
        else
            this._lastValidationRule.if(conditionPredicate);

        return this;
    }

    public withMessage(errorMessage: string | Function): PropertyValidator<T, TProperty>
    {
        given(errorMessage, "errorMessage")
            .ensureHasValue();
        
        if (typeof errorMessage === "string")
        {
            given(errorMessage, "errorMessage")
                .ensureIsString()
                .ensure(t => !t.isEmptyOrWhiteSpace());
            
            errorMessage = errorMessage.trim();
        }
        else if (typeof errorMessage === "function")
        {
            given(errorMessage, "errorMessage")
                .ensureIsFunction();
        }
        else
            throw new ArgumentException("errorMessage", "has to be a string or a function that returns a string"); 
            

        if (this._lastValidationRule == null)
        {
            this._overrideError = true;
            this._errorMessage = errorMessage;
        }
        else
            this._lastValidationRule.withMessage(errorMessage, true);

        return this;
    }
}

