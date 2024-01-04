import { given } from "@nivinjoseph/n-defensive";
import { BaseStringValidationRule } from "./base-string-validation-rule.js";
// public
export function matchesRegex(regex) {
    return new StringMatchesRegex(regex);
}
class StringMatchesRegex extends BaseStringValidationRule {
    constructor(regex) {
        given(regex, "regex").ensureHasValue().ensureIsType(RegExp);
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || regex.test(t),
            error: "Invalid format"
        });
    }
}
//# sourceMappingURL=matches-regex.js.map