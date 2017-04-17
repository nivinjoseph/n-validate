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
var BaseNumberValidationRule = (function (_super) {
    __extends(BaseNumberValidationRule, _super);
    function BaseNumberValidationRule() {
        var _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return typeof t === "number"; },
            error: "Invalid value"
        });
        return _this;
    }
    return BaseNumberValidationRule;
}(base_validation_rule_1.BaseValidationRule));
exports.BaseNumberValidationRule = BaseNumberValidationRule;
//# sourceMappingURL=base-number-validation-rule.js.map