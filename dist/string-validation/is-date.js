import { given } from "@nivinjoseph/n-defensive";
import { DateTime } from "luxon";
import { BaseStringValidationRule } from "./base-string-validation-rule.js";
// public
/**
 *
 * @param format eg: yyyy-MM-dd  https://moment.github.io/luxon/#/formatting?id=table-of-tokens
 */
export function isDate(format) {
    return new StringIsDate(format);
}
class StringIsDate extends BaseStringValidationRule {
    constructor(format) {
        given(format, "format").ensureHasValue().ensureIsString();
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || DateTime.fromFormat(t, format).isValid,
            error: "Invalid date"
        });
    }
}
//# sourceMappingURL=is-date.js.map