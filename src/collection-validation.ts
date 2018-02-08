import { Validator } from "./validator";
import { ValidationRule } from "./validation-rule";
import { given } from "@nivinjoseph/n-defensive";

// public
export class CollectionValidationRule<T> implements ValidationRule<Array<T>>
{
    private readonly _validator: Validator<T>;
    private _error: any;


    public get error(): any { return this._error; }


    constructor(validator: Validator<T>)
    {
        given(validator, "validator").ensureHasValue();
        this._validator = validator;
    }


    public validate(collection: Array<T>): boolean
    {
        let errors = new Array<any>();
        collection.forEach(item =>
        {
            this._validator.validate(item);
            if (this._validator.hasErrors)
                errors.push(this._validator.errors);
        });

        if (errors.length > 0)
        {
            this._error = errors;
            return false;
        }

        return true;
    }
}