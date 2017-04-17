import { ValidationRule } from "./validation-rule";

// public
export abstract class BaseValidationRule<T> implements ValidationRule<T>
{
    private readonly _validationRules = new Array<ValidationRule<T>>();
    private _error: string;


    public get error(): any { return this._error; }


    public validate(value: T): boolean
    {
        this._error = null;
        for (let i = 0; i < this._validationRules.length; i++)
        {
            if (this._validationRules[i].validate(value))
                continue;
            this._error = this._validationRules[i].error;
            return false;
        }
        return true;
    }

    protected addValidationRule(validationRule: ValidationRule<T>): void
    {
        this._validationRules.push(validationRule);
    }
}