"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMinLength = void 0;
const base_string_validation_rule_1 = require("./base-string-validation-rule");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
// public
function hasMinLength(minLength) {
    return new StringHasMinLength(minLength);
}
exports.hasMinLength = hasMinLength;
class StringHasMinLength extends base_string_validation_rule_1.BaseStringValidationRule {
    constructor(minLength) {
        (0, n_defensive_1.given)(minLength, "minLength").ensureHasValue();
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || t.trim().length >= minLength,
            error: `Min length of ${minLength} required`
        });
    }
}
//# sourceMappingURL=has-min-length.js.map