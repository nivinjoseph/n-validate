"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numval = exports.BaseNumberValidationRule = void 0;
const base_number_validation_rule_1 = require("./base-number-validation-rule");
Object.defineProperty(exports, "BaseNumberValidationRule", { enumerable: true, get: function () { return base_number_validation_rule_1.BaseNumberValidationRule; } });
const has_min_value_1 = require("./has-min-value");
const has_max_value_1 = require("./has-max-value");
const is_in_1 = require("./is-in");
const is_not_in_1 = require("./is-not-in");
const has_exact_value_1 = require("./has-exact-value");
const numval = { hasMinValue: has_min_value_1.hasMinValue, hasMaxValue: has_max_value_1.hasMaxValue, hasExactValue: has_exact_value_1.hasExactValue, isIn: is_in_1.isIn, isNotIn: is_not_in_1.isNotIn };
exports.numval = numval;
//# sourceMappingURL=index.js.map