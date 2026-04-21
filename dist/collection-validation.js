import { given } from "@nivinjoseph/n-defensive";
// public
export class CollectionValidationRule {
    _validator;
    _error = [];
    get error() { return this._error; }
    constructor(validator) {
        given(validator, "validator").ensureHasValue();
        this._validator = validator;
    }
    validate(collection) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (collection == null) {
            this._error = [];
            return true;
        }
        const errors = new Array();
        collection.forEach(item => {
            if (item == null) {
                errors.push(null);
                return;
            }
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