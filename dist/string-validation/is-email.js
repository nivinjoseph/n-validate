import { BaseStringValidationRule } from "./base-string-validation-rule.js";
// public
export function isEmail() {
    return new StringIsEmail();
}
class StringIsEmail extends BaseStringValidationRule {
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