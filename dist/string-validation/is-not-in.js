"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_string_validation_rule_1 = require("./base-string-validation-rule");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
function isNotIn(values, ignoreCase) {
    return new StringIsNotIn(values, ignoreCase);
}
exports.isNotIn = isNotIn;
class StringIsNotIn extends base_string_validation_rule_1.BaseStringValidationRule {
    constructor(values, ignoreCase) {
        n_defensive_1.given(values, "values").ensureHasValue();
        super();
        this.addValidationRule({
            validate: t => t == null || ignoreCase
                ? values.every(v => v.trim().toLowerCase() !== t.trim().toLowerCase())
                : values.every(v => v.trim() !== t.trim()),
            error: "Invalid value"
        });
    }
}
//# sourceMappingURL=is-not-in.js.map