import { given } from "@nivinjoseph/n-defensive";
import { PropertyValidator, BooleanPropertyValidator, NumberPropertyValidator, StringPropertyValidator, ArrayPropertyValidator, ObjectPropertyValidator } from "./property-validator";
// import { ValidationInitializer } from "./validation-initializer";
// import { ValidationExecutor } from "./validation-executor";
import { InternalPropertyValidator } from "./internal-property-validator";

// public
export class Validator<T> // implements ValidationInitializer<T>, ValidationExecutor<T>
{
    private readonly _propertyValidators = new Array<InternalPropertyValidator<T, any>>();
    private readonly _errors: { [key in keyof T]: any } = {} as any;
    private _hasErrors = false;
    private _isEnabled = true;
    

    public get isValid(): boolean { return !this._hasErrors; }
    public get hasErrors(): boolean { return this._hasErrors; }
    public get errors(): { [key in keyof T]: any } { return this._errors; }
    public get hasRules(): boolean { return this._propertyValidators.length > 0; }
    public get isEnabled(): boolean { return this._isEnabled; }
    
    
    public constructor(disabled = false)
    {
        this._isEnabled = !disabled;
    }

    // public for<TProperty extends boolean>(propertyName: string): BooleanPropertyValidator<T>;
    // public for<TProperty extends number>(propertyName: string): NumberPropertyValidator<T>;
    // public for<TProperty extends string>(propertyName: string): StringPropertyValidator<T>;
    // public for<TProperty extends Array<any>>(propertyName: string): ArrayPropertyValidator<T>;
    // public for<TProperty extends object>(propertyName: string): ObjectPropertyValidator<T>;
    public prop<K extends keyof T, TProperty extends NonNullable<T[K]>>(propertyName: K)
        : TProperty extends boolean ? BooleanPropertyValidator<T>
        : TProperty extends number ? NumberPropertyValidator<T>
        : TProperty extends string ? StringPropertyValidator<T>
        : TProperty extends ReadonlyArray<infer A> ? ArrayPropertyValidator<T, A> 
        : TProperty extends object ? ObjectPropertyValidator<T, TProperty>
        : PropertyValidator<T, TProperty>
    {
        given(propertyName as string, "propertyName")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => this._propertyValidators.every(u => u.propertyName !== t),
            "validation already defined for property '{0}'".format(propertyName));

        const propertyValidator = new InternalPropertyValidator<T, TProperty>(propertyName);
        this._propertyValidators.push(propertyValidator);
        this._errors[propertyName] = null;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return propertyValidator as any;
    }
    
    public clearProp<K extends keyof T>(propertyName: K): void
    {
        given(propertyName as string, "propertyName").ensureHasValue().ensureIsString();
        
        const propertyValidator = this._propertyValidators.find(t => t.propertyName === propertyName);
        if (!propertyValidator)
            return;
        
        this._propertyValidators.splice(this._propertyValidators.indexOf(propertyValidator), 1);
        this._errors[propertyName] = null;
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