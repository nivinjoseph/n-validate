"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// public
var BaseValidationRule = (function () {
    function BaseValidationRule() {
        this._validationRules = new Array();
    }
    Object.defineProperty(BaseValidationRule.prototype, "error", {
        get: function () { return this._error; },
        enumerable: true,
        configurable: true
    });
    BaseValidationRule.prototype.validate = function (value) {
        this._error = null;
        for (var i = 0; i < this._validationRules.length; i++) {
            if (this._validationRules[i].validate(value))
                continue;
            this._error = this._validationRules[i].error;
            return false;
        }
        return true;
    };
    BaseValidationRule.prototype.addValidationRule = function (validationRule) {
        this._validationRules.push(validationRule);
    };
    return BaseValidationRule;
}());
exports.BaseValidationRule = BaseValidationRule;
//# sourceMappingURL=base-validation-rule.js.map