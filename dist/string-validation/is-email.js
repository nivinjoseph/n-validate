"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = void 0;
const base_string_validation_rule_1 = require("./base-string-validation-rule");
// public
function isEmail() {
    return new StringIsEmail();
}
exports.isEmail = isEmail;
class StringIsEmail extends base_string_validation_rule_1.BaseStringValidationRule {
    constructor() {
        super();
        this.addValidationRule({
            validate: t => {
                // eslint-disable-next-line no-useless-escape
                const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                return t == null || re.test(t.trim());
            },
            error: "Invalid value"
        });
    }
}
//# sourceMappingURL=is-email.js.map