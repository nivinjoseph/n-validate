"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionValidationRule = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
// public
class CollectionValidationRule {
    constructor(validator) {
        this._error = [];
        (0, n_defensive_1.given)(validator, "validator").ensureHasValue();
        this._validator = validator;
    }
    get error() { return this._error; }
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
exports.CollectionValidationRule = CollectionValidationRule;
//# sourceMappingURL=collection-validation.js.map