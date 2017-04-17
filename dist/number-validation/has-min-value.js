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
var base_number_validation_rule_1 = require("./base-number-validation-rule");
var n_defensive_1 = require("n-defensive");
require("n-ext");
// public
function hasMinValue(minValue) {
    return new NumberHasMinValue(minValue);
}
exports.hasMinValue = hasMinValue;
var NumberHasMinValue = (function (_super) {
    __extends(NumberHasMinValue, _super);
    function NumberHasMinValue(minValue) {
        var _this = this;
        n_defensive_1.given(minValue, "minValue").ensureHasValue();
        _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return t == null || t >= minValue; },
            error: "Value cannot be less than {0}".format(minValue)
        });
        return _this;
    }
    return NumberHasMinValue;
}(base_number_validation_rule_1.BaseNumberValidationRule));
//# sourceMappingURL=has-min-value.js.map