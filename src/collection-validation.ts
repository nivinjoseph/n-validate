import { Validator } from "./validator";
import { ValidationRule } from "./validation-rule";
import { given } from "@nivinjoseph/n-defensive";

// public
export class CollectionValidationRule<T> implements ValidationRule<Array<T>>
{
    private readonly _validator: Validator<T>;
    private _error: Array<object> = [];


    public get error(): Array<object> { return this._error; }


    public constructor(validator: Validator<T>)
    {
        given(validator, "validator").ensureHasValue();
        this._validator = validator;
    }


    public validate(collection: Array<T>): boolean
    {
        const errors = new Array<any>();
        collection.forEach(item =>
        {
            this._validator.validate(item);
            if (this._validator.hasErrors)
                errors.push(JSON.parse(JSON.stringify(this._validator.errors)));
            else errors.push(null);
        });

        this._error = errors;
        
        if (errors.some(t => t !== null))
            return false;
        else
            return true;
    }
}