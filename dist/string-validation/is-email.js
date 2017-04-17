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
// public
function isEmail() {
    return new StringIsEmail();
}
exports.isEmail = isEmail;
var StringIsEmail = (function (_super) {
    __extends(StringIsEmail, _super);
    function StringIsEmail() {
        var _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return t == null || re.test(t.trim());
            },
            error: "Invalid value"
        });
        return _this;
    }
    return StringIsEmail;
}(base_string_validation_rule_1.BaseStringValidationRule));
//# sourceMappingURL=is-email.js.map