"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasExactLength = void 0;
const base_string_validation_rule_1 = require("./base-string-validation-rule");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
// public
function hasExactLength(exactLength) {
    return new StringHasExactLength(exactLength);
}
exports.hasExactLength = hasExactLength;
class StringHasExactLength extends base_string_validation_rule_1.BaseStringValidationRule {
    constructor(exactLength) {
        (0, n_defensive_1.given)(exactLength, "exactLength").ensureHasValue();
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || t.trim().length === exactLength,
            error: `Exact length of ${exactLength} required`
        });
    }
}
//# sourceMappingURL=has-exact-length.js.map