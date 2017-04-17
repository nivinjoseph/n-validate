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
function hasMaxLength(maxLength) {
    return new StringHasMaxLength(maxLength);
}
exports.hasMaxLength = hasMaxLength;
var StringHasMaxLength = (function (_super) {
    __extends(StringHasMaxLength, _super);
    function StringHasMaxLength(maxLength) {
        var _this = this;
        n_defensive_1.given(maxLength, "maxLength").ensureHasValue();
        _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return t == null || t.trim().length <= maxLength; },
            error: "Max length of {0} required".format(maxLength)
        });
        return _this;
    }
    return StringHasMaxLength;
}(base_string_validation_rule_1.BaseStringValidationRule));
//# sourceMappingURL=has-max-length.js.map