import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";
import { PropertyValidator } from "./property-validator";
import { ValidationInitializer } from "./validation-initializer";
import { ValidationExecutor } from "./validation-executor";
import { InternalPropertyValidator } from "./internal-property-validator";

// public
export class Validator<T> implements ValidationInitializer<T>, ValidationExecutor<T>
{
    private readonly _propertyValidators = new Array<InternalPropertyValidator<T, any>>();
    private readonly _errors: { [index: string]: any } = {};
    private _hasErrors = false;
    private _isEnabled = true;
    

    public get isValid(): boolean { return !this._hasErrors; }
    public get hasErrors(): boolean { return this._hasErrors; }
    public get errors(): { [index: string]: any } { return this._errors; }
    public get hasRules(): boolean { return this._propertyValidators.length > 0; }
    public get isEnabled(): boolean { return this._isEnabled; }
    
    
    public constructor(isEnabled: boolean = true)
    {
        this._isEnabled = isEnabled;
    }


    public for<TProperty>(propertyName: string): PropertyValidator<T, TProperty>
    {
        given(propertyName, "propertyName")
            .ensureHasValue()
            .ensure(t => !t.isEmptyOrWhiteSpace())
            .ensure(t => this._propertyValidators.every(u => u.propertyName !== t),
            "validation already defined for property '{0}'".format(propertyName));

        let propertyValidator = new InternalPropertyValidator<T, TProperty>(propertyName);
        this._propertyValidators.push(propertyValidator);
        this._errors[propertyName] = null;
        return propertyValidator;
    }

    public validate(value: T): void 
    {
        given(value, "value").ensureHasValue();
        
        this._hasErrors = false;
        if (this._isEnabled)
        {
            this._propertyValidators.forEach(t =>
            {
                t.validate(value);
                if (t.hasError)
                {
                    this._hasErrors = true;
                    this._errors[t.propertyName] = t.error;
                    return;
                }    
                    
                this._errors[t.propertyName] = null;
            });
        }   
        else
        {
            this._propertyValidators.forEach(t => this._errors[t.propertyName] = null);
        }
    }
    
    public enable(): void
    {
        this._isEnabled = true;
    }
    
    public disable(): void
    {
        this._isEnabled = false;
    }
}