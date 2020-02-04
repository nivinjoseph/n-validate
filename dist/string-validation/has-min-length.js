"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_string_validation_rule_1 = require("./base-string-validation-rule");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
function hasMinLength(minLength) {
    return new StringHasMinLength(minLength);
}
exports.hasMinLength = hasMinLength;
class StringHasMinLength extends base_string_validation_rule_1.BaseStringValidationRule {
    constructor(minLength) {
        n_defensive_1.given(minLength, "minLength").ensureHasValue();
        super();
        this.addValidationRule({
            validate: t => t == null || t.trim().length >= minLength,
            error: "Min length of {0} required".format(minLength)
        });
    }
}
//# sourceMappingURL=has-min-length.js.map