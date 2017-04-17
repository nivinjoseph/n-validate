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
// public
function isIn(values) {
    return new NumberIsIn(values);
}
exports.isIn = isIn;
var NumberIsIn = (function (_super) {
    __extends(NumberIsIn, _super);
    function NumberIsIn(values) {
        var _this = this;
        n_defensive_1.given(values, "values").ensureHasValue();
        _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return t == null || values.some(function (u) { return u === t; }); },
            error: "Invalid value"
        });
        return _this;
    }
    return NumberIsIn;
}(base_number_validation_rule_1.BaseNumberValidationRule));
//# sourceMappingURL=is-in.js.map