"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchesRegex = void 0;
const base_string_validation_rule_1 = require("./base-string-validation-rule");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
// public
function matchesRegex(regex) {
    return new StringMatchesRegex(regex);
}
exports.matchesRegex = matchesRegex;
class StringMatchesRegex extends base_string_validation_rule_1.BaseStringValidationRule {
    constructor(regex) {
        (0, n_defensive_1.given)(regex, "regex").ensureHasValue().ensureIsType(RegExp);
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || regex.test(t),
            error: "Invalid format"
        });
    }
}
//# sourceMappingURL=matches-regex.js.map