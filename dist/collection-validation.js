import { given } from "@nivinjoseph/n-defensive";
// public
export class CollectionValidationRule {
    get error() { return this._error; }
    constructor(validator) {
        this._error = [];
        given(validator, "validator").ensureHasValue();
        this._validator = validator;
    }
    validate(collection) {
        const errors = new Array();
        collection.forEach(item => {
            this._validator.validate(item);
            if (this._validator.hasErrors)
                errors.push(JSON.parse(JSON.stringify(this._validator.errors)));
            else
                errors.push(null);
        });
        this._error = errors;
        if (errors.some(t => t !== null))
            return false;
        else
            return true;
    }
}
//# sourceMappingURL=collection-validation.js.map