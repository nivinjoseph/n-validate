"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_string_validation_rule_1 = require("./base-string-validation-rule");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
function hasExactLength(exactLength) {
    return new StringHasExactLength(exactLength);
}
exports.hasExactLength = hasExactLength;
class StringHasExactLength extends base_string_validation_rule_1.BaseStringValidationRule {
    constructor(exactLength) {
        n_defensive_1.given(exactLength, "exactLength").ensureHasValue();
        super();
        this.addValidationRule({
            validate: t => t == null || t.trim().length === exactLength,
            error: "Exact length of {0} required".format(exactLength)
        });
    }
}
//# sourceMappingURL=has-exact-length.js.map