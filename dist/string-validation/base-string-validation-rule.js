"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_validation_rule_1 = require("./../base-validation-rule");
// public
var BaseStringValidationRule = (function (_super) {
    __extends(BaseStringValidationRule, _super);
    function BaseStringValidationRule() {
        var _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return typeof t === "string"; },
            error: "Invalid value"
        });
        return _this;
    }
    BaseStringValidationRule.prototype.isNumber = function (value) {
        value = value.toString().trim();
        if (value.length === 0)
            return false;
        var parsed = +value.toString().trim();
        return !isNaN(parsed) && isFinite(parsed);
    };
    return BaseStringValidationRule;
}(base_validation_rule_1.BaseValidationRule));
exports.BaseStringValidationRule = BaseStringValidationRule;
//# sourceMappingURL=base-string-validation-rule.js.map