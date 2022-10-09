"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = void 0;
const base_string_validation_rule_1 = require("./base-string-validation-rule");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
// import * as moment from "moment";
const dayjs = require("dayjs");
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
// public
/**
 *
 * @param format eg: YYYY-MM-DD
 */
function isDate(format) {
    return new StringIsDate(format);
}
exports.isDate = isDate;
class StringIsDate extends base_string_validation_rule_1.BaseStringValidationRule {
    constructor(format) {
        (0, n_defensive_1.given)(format, "format").ensureHasValue().ensureIsString();
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || dayjs(t, format, true).isValid(),
            error: "Invalid date"
        });
    }
}
//# sourceMappingURL=is-date.js.map