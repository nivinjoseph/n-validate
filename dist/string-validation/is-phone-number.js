import { BaseStringValidationRule } from "./base-string-validation-rule.js";
// public
export function isPhoneNumber() {
    return new StringIsPhoneNumber();
}
class StringIsPhoneNumber extends BaseStringValidationRule {
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