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
function hasMaxValue(maxValue) {
    return new NumberHasMaxValue(maxValue);
}
exports.hasMaxValue = hasMaxValue;
var NumberHasMaxValue = (function (_super) {
    __extends(NumberHasMaxValue, _super);
    function NumberHasMaxValue(maxValue) {
        var _this = this;
        n_defensive_1.given(maxValue, "maxValue").ensureHasValue();
        _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return t == null || t <= maxValue; },
            error: "Value cannot be greater than {0}".format(maxValue)
        });
        return _this;
    }
    return NumberHasMaxValue;
}(base_number_validation_rule_1.BaseNumberValidationRule));
//# sourceMappingURL=has-max-value.js.map