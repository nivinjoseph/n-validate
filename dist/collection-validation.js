"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var n_defensive_1 = require("n-defensive");
var CollectionValidationRule = (function () {
    function CollectionValidationRule(validator) {
        n_defensive_1.default(validator, "validator").ensureHasValue();
        this._validator = validator;
    }
    Object.defineProperty(CollectionValidationRule.prototype, "error", {
        get: function () { return this._error; },
        enumerable: true,
        configurable: true
    });
    CollectionValidationRule.prototype.validate = function (collection) {
        var _this = this;
        var errors = [];
        collection.forEach(function (item) {
            _this._validator.validate(item);
            if (_this._validator.hasErrors)
                errors.push(_this._validator.errors);
        });
        if (errors.length > 0) {
            this._error = errors;
            return false;
        }
        return true;
    };
    return CollectionValidationRule;
}());
exports.default = CollectionValidationRule;
//# sourceMappingURL=collection-validation.js.map