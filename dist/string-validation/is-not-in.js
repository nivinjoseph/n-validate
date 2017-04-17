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
var base_string_validation_rule_1 = require("./base-string-validation-rule");
var n_defensive_1 = require("n-defensive");
function isNotIn(values, ignoreCase) {
    return new StringIsNotIn(values, ignoreCase);
}
exports.isNotIn = isNotIn;
var StringIsNotIn = (function (_super) {
    __extends(StringIsNotIn, _super);
    function StringIsNotIn(values, ignoreCase) {
        var _this = this;
        n_defensive_1.given(values, "values").ensureHasValue();
        _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return t == null || ignoreCase
                ? values.every(function (v) { return v.trim().toLowerCase() !== t.trim().toLowerCase(); })
                : values.every(function (v) { return v.trim() !== t.trim(); }); },
            error: "Invalid value"
        });
        return _this;
    }
    return StringIsNotIn;
}(base_string_validation_rule_1.BaseStringValidationRule));
//# sourceMappingURL=is-not-in.js.map