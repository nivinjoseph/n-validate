import { Validator } from "./validator";
import { ValidationRule } from "./validation-rule";
export declare class CollectionValidationRule<T> implements ValidationRule<Array<T>> {
    private readonly _validator;
    private _error;
    readonly error: any;
    constructor(validator: Validator<T>);
    validate(collection: Array<T>): boolean;
}
