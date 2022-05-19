import { PropertyValidator, BooleanPropertyValidator, NumberPropertyValidator, StringPropertyValidator, ArrayPropertyValidator, ObjectPropertyValidator } from "./property-validator";
import { InternalPropertyValidationRule } from "./internal-property-validation-rule";
import { ValidationRule } from "./validation-rule";
import { Validator } from "./validator";
import { given } from "@nivinjoseph/n-defensive";
import { ArgumentException } from "@nivinjoseph/n-exception";
import { numval, strval, CollectionValidationRule } from ".";

// internal
export class InternalPropertyValidator<T, TProperty> implements PropertyValidator<T, TProperty>, BooleanPropertyValidator<T>, NumberPropertyValidator<T>, StringPropertyValidator<T>, ArrayPropertyValidator<T, any>, ObjectPropertyValidator<T, any>
{
    private readonly _propertyName: keyof T;
    private _hasError = false;
    private _error: any = null;
    private readonly _validationRules = new Array<InternalPropertyValidationRule<T, TProperty>>();
    private _lastValidationRule: InternalPropertyValidationRule<T, TProperty> | null = null;
    private _conditionPredicate: ((value: T) => boolean) | null = null;
    private _overrideError = false;
    private _errorMessage: string | Function = null as any;


    public get propertyName(): keyof T { return this._propertyName; }
    public get hasError(): boolean { return this._hasError; }
    public get error(): string { return this._error as string; }


    public constructor(propertyName: keyof T)
    {
        this._propertyName = propertyName;
    }


    public validate(value: T): void
    {
        this._hasError = false;
        this._error = null;
        
        if (this._conditionPredicate != null && !this._conditionPredicate(value))
            return;
        
        const propertyVal = (<Object>value).getValue(this._propertyName as string);

        for (let i = 0; i < this._validationRules.length; i++)
        {
            const validationRule = this._validationRules[i];
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

    public isRequired(): this
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.ensure((propertyValue: TProperty) =>
        {
            if (propertyValue != null)
            {
                if (typeof propertyValue === "string")
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

    public isOptional(): this
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.ensure((propertyValue: TProperty) =>
        {
            if (propertyValue == null)
                // eslint-disable-next-line @typescript-eslint/no-throw-literal
                throw "OPTIONAL";

            if (typeof propertyValue === "string" && (<string>(<any>propertyValue)).isEmptyOrWhiteSpace())
                // eslint-disable-next-line @typescript-eslint/no-throw-literal
                throw "OPTIONAL";

            return true;
        });

        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    
    public isBoolean(): this
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.ensure((propertyValue: TProperty) => typeof propertyValue === "boolean");

        this._lastValidationRule.withMessage("Must be boolean");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    
    public isString(): this
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.ensure((propertyValue: TProperty) => typeof propertyValue === "string");

        this._lastValidationRule.withMessage("Must be string");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    
    public isNumber(): this
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.ensure((propertyValue: TProperty) => typeof propertyValue === "number");

        this._lastValidationRule.withMessage("Must be number");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    
    public isArray(): this
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.ensure((propertyValue: TProperty) => Array.isArray(propertyValue));

        this._lastValidationRule.withMessage("Must be array");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    
    public isObject(): this
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.ensure((propertyValue: TProperty) => typeof propertyValue === "object");

        this._lastValidationRule.withMessage("Must be object");
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    
    public isType(type: Function): this
    {
        given(type, "type").ensureHasValue().ensureIsFunction();
        
        const typeName = (<Object>type).getTypeName();
        
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.ensure((propertyValue: TProperty) => (<Object>propertyValue).getTypeName() === typeName);
        this._lastValidationRule.withMessage(`Must be of type ${typeName}`);
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    
    public isInstanceOf(type: Function): this
    {
        given(type, "type").ensureHasValue().ensureIsFunction();
        
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.ensure((propertyValue: TProperty) => propertyValue instanceof type);
        this._lastValidationRule.withMessage(`Must be instance of ${(<Object>type).getTypeName()}`);
        this._validationRules.push(this._lastValidationRule);
        return this;
    }
    
    public ensure(propertyValidationPredicate: (propertyValue: TProperty | any) => boolean): this
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.ensure(propertyValidationPredicate);
        this._validationRules.push(this._lastValidationRule);
        return this;
    }

    public ensureT(valueValidationPredicate: (value: T) => boolean): this
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.ensureT(valueValidationPredicate);
        this._validationRules.push(this._lastValidationRule);
        return this;
    }

    public useValidationRule(validationRule: ValidationRule<TProperty | any>): this
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.useValidationRule(validationRule);
        this._validationRules.push(this._lastValidationRule);
        return this;
    }

    public useValidator(validator: Validator<TProperty | any>): this
    {
        this._lastValidationRule = new InternalPropertyValidationRule<T, TProperty>();
        this._lastValidationRule.useValidator(validator);
        this._validationRules.push(this._lastValidationRule);
        return this;
    }

    public when(conditionPredicate: (value: T) => boolean): this
    {
        given(conditionPredicate, "conditionPredicate").ensureHasValue();

        if (this._lastValidationRule == null)
            this._conditionPredicate = conditionPredicate;
        else
            this._lastValidationRule.if(conditionPredicate);

        return this;
    }

    public withMessage(errorMessage: string | Function): this
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
    
    
    public hasMinValue(minValue: number): this
    {
        return this.useValidationRule(numval.hasMinValue(minValue));
    }
    
    public hasMaxValue(maxValue: number): this
    {
        return this.useValidationRule(numval.hasMaxValue(maxValue));
    }
    
    public hasExactValue(exactValue: number): this
    {
        return this.useValidationRule(numval.hasExactValue(exactValue));
    }
    
    public isInNumbers(values: ReadonlyArray<number>): this
    {
        return this.useValidationRule(numval.isIn(values));
    }
    
    public isNotInNumbers(values: ReadonlyArray<number>): this
    {
        return this.useValidationRule(numval.isNotIn(values));
    }
    
    
    public hasMinLength(minLength: number): this
    {
        return this.useValidationRule(strval.hasMinLength(minLength));
    }
    
    public hasMaxLength(maxLength: number): this
    {
        return this.useValidationRule(strval.hasMaxLength(maxLength));
    }
    
    public hasExactLength(exactLength: number): this
    {
        return this.useValidationRule(strval.hasExactLength(exactLength));
    }
    
    public isInStrings(values: ReadonlyArray<string>, ignoreCase?: boolean): this
    {
        return this.useValidationRule(strval.isIn(values, !!ignoreCase));
    }
    
    public isNotInStrings(values: ReadonlyArray<string>, ignoreCase?: boolean): this
    {
        return this.useValidationRule(strval.isNotIn(values, !!ignoreCase));
    }
    
    public containsOnlyNumbers(): this
    {
        return this.useValidationRule(strval.containsOnlyNumbers());
    }
    
    public isPhoneNumber(): this
    {
        return this.useValidationRule(strval.isPhoneNumber());
    }
    
    public isEmail(): this
    {
        return this.useValidationRule(strval.isEmail());
    }
    
    public isDate(format: string): this
    {
        return this.useValidationRule(strval.isDate(format));
    }
    
    public matchesRegex(regex: RegExp): this
    {
        return this.useValidationRule(strval.matchesRegex(regex));
    }
    
    public isEnum(enumType: object): this
    {
        given(enumType, "enumType").ensureHasValue().ensureIsObject();
        
        const enumValues = this._getEnumValues(enumType);
        
        return this.useValidationRule({
            validate: (value: T) => enumValues.contains(value),
            error: "Invalid enum value"
        });
    }
    
    
    public useCollectionValidator(validator: Validator<any>): this
    {
        return this.useValidationRule(new CollectionValidationRule(validator));
    }
    
    
    private _checkIsNumber(value: any): boolean
    {
        if (value == null)
            return false;

        const val = (<object>value).toString().trim();
        if (value.length === 0)
            return false;
        const parsed = +val;
        return !isNaN(parsed) && isFinite(parsed);
    }

    private _getEnumValues(enumType: object): ReadonlyArray<any>
    {
        const keys = Object.keys(enumType);
        if (keys.length === 0)
            return [];

        if (this._checkIsNumber(keys[0]))
            return keys.filter(t => this._checkIsNumber(t)).map(t => +t);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return keys.map(t => (<any>enumType)[t]);
    }
}