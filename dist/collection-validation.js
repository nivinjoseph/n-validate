"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
class CollectionValidationRule {
    constructor(validator) {
        n_defensive_1.given(validator, "validator").ensureHasValue();
        this._validator = validator;
    }
    get error() { return this._error; }
    validate(collection) {
        let errors = new Array();
        collection.forEach(item => {
            this._validator.validate(item);
            if (this._validator.hasErrors)
                errors.push(this._validator.errors);
        });
        if (errors.length > 0) {
            this._error = errors;
            return false;
        }
        return true;
    }
}
exports.CollectionValidationRule = CollectionValidationRule;
//# sourceMappingURL=collection-validation.js.map