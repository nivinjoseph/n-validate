"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPhoneNumber = void 0;
const base_string_validation_rule_1 = require("./base-string-validation-rule");
// public
function isPhoneNumber() {
    return new StringIsPhoneNumber();
}
exports.isPhoneNumber = isPhoneNumber;
class StringIsPhoneNumber extends base_string_validation_rule_1.BaseStringValidationRule {
    constructor() {
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || (this.isNumber(t) && t.trim().length === 10),
            error: "Invalid value"
        });
    }
}
//# sourceMappingURL=is-phone-number.js.map