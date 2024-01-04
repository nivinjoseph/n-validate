import { ValidationRule } from "./validation-rule.js";
import { Validator } from "./validator.js";
export declare class CollectionValidationRule<T> implements ValidationRule<Array<T>> {
    private readonly _validator;
    private _error;
    get error(): Array<object>;
    constructor(validator: Validator<T>);
    validate(collection: Array<T>): boolean;
}
//# sourceMappingURL=collection-validation.d.ts.map