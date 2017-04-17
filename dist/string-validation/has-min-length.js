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
require("n-ext");
// public
function hasMinLength(minLength) {
    return new StringHasMinLength(minLength);
}
exports.hasMinLength = hasMinLength;
var StringHasMinLength = (function (_super) {
    __extends(StringHasMinLength, _super);
    function StringHasMinLength(minLength) {
        var _this = this;
        n_defensive_1.given(minLength, "minLength").ensureHasValue();
        _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return t == null || t.trim().length >= minLength; },
            error: "Min length of {0} required".format(minLength)
        });
        return _this;
    }
    return StringHasMinLength;
}(base_string_validation_rule_1.BaseStringValidationRule));
//# sourceMappingURL=has-min-length.js.map