"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_validation_rule_1 = require("./base-validation-rule");
require("n-ext");
var n_defensive_1 = require("n-defensive");
function hasMinLength(minLength) {
    return new StringHasMinLength(minLength);
}
exports.hasMinLength = hasMinLength;
function hasMaxLength(maxLength) {
    return new StringHasMaxLength(maxLength);
}
exports.hasMaxLength = hasMaxLength;
function hasExactLength(exactLength) {
    return new StringHasExactLength(exactLength);
}
exports.hasExactLength = hasExactLength;
function stringIsIn(values, ignoreCase) {
    return new StringIsIn(values, ignoreCase);
}
exports.stringIsIn = stringIsIn;
function stringIsNotIn(values, ignoreCase) {
    return new StringIsNotIn(values, ignoreCase);
}
exports.stringIsNotIn = stringIsNotIn;
function isEmail() {
    return new StringIsEmail();
}
exports.isEmail = isEmail;
function containsOnlyNumbers() {
    return new StringContainsOnlyNumbers();
}
exports.containsOnlyNumbers = containsOnlyNumbers;
function isPhoneOrFaxNumber() {
    return new StringIsPhoneOrFaxNumber();
}
exports.isPhoneOrFaxNumber = isPhoneOrFaxNumber;
var BaseStringValidationRule = (function (_super) {
    __extends(BaseStringValidationRule, _super);
    function BaseStringValidationRule() {
        var _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return typeof t === "string"; },
            error: "Invalid value"
        });
        return _this;
    }
    return BaseStringValidationRule;
}(base_validation_rule_1.default));
var StringHasMinLength = (function (_super) {
    __extends(StringHasMinLength, _super);
    function StringHasMinLength(minLength) {
        var _this = this;
        n_defensive_1.default(minLength, "minLength").ensureHasValue();
        _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return t == null || t.trim().length >= minLength; },
            error: "Min length of {0} required".format(minLength)
        });
        return _this;
    }
    return StringHasMinLength;
}(BaseStringValidationRule));
var StringHasMaxLength = (function (_super) {
    __extends(StringHasMaxLength, _super);
    function StringHasMaxLength(maxLength) {
        var _this = this;
        n_defensive_1.default(maxLength, "maxLength").ensureHasValue();
        _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return t == null || t.trim().length <= maxLength; },
            error: "Max length of {0} required".format(maxLength)
        });
        return _this;
    }
    return StringHasMaxLength;
}(BaseStringValidationRule));
var StringHasExactLength = (function (_super) {
    __extends(StringHasExactLength, _super);
    function StringHasExactLength(exactLength) {
        var _this = this;
        n_defensive_1.default(exactLength, "exactLength").ensureHasValue();
        _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return t == null || t.trim().length === exactLength; },
            error: "Exact length of {0} required".format(exactLength)
        });
        return _this;
    }
    return StringHasExactLength;
}(BaseStringValidationRule));
var StringIsIn = (function (_super) {
    __extends(StringIsIn, _super);
    function StringIsIn(values, ignoreCase) {
        var _this = this;
        n_defensive_1.default(values, "values").ensureHasValue();
        _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return t == null || ignoreCase
                ? values.some(function (v) { return v.trim().toLowerCase() === t.trim().toLowerCase(); })
                : values.some(function (v) { return v.trim() === t.trim(); }); },
            error: "Invalid value"
        });
        return _this;
    }
    return StringIsIn;
}(BaseStringValidationRule));
var StringIsNotIn = (function (_super) {
    __extends(StringIsNotIn, _super);
    function StringIsNotIn(values, ignoreCase) {
        var _this = this;
        n_defensive_1.default(values, "values").ensureHasValue();
        _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return t == null || ignoreCase
                ? values.every(function (v) { return v.trim().toLowerCase() !== t.trim().toLowerCase(); })
                : values.every(function (v) { return v.trim() === t.trim(); }); },
            error: "Invalid value"
        });
        return _this;
    }
    return StringIsNotIn;
}(BaseStringValidationRule));
var StringIsEmail = (function (_super) {
    __extends(StringIsEmail, _super);
    function StringIsEmail() {
        var _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return t == null || re.test(t.trim());
            },
            error: "Invalid value"
        });
        return _this;
    }
    return StringIsEmail;
}(BaseStringValidationRule));
function isNumber(value) {
    var parsed = +value.toString().trim();
    return !isNaN(parsed) && isFinite(parsed);
}
var StringContainsOnlyNumbers = (function (_super) {
    __extends(StringContainsOnlyNumbers, _super);
    function StringContainsOnlyNumbers() {
        var _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return t == null || isNumber(t); },
            error: "Invalid value"
        });
        return _this;
    }
    return StringContainsOnlyNumbers;
}(BaseStringValidationRule));
var StringIsPhoneOrFaxNumber = (function (_super) {
    __extends(StringIsPhoneOrFaxNumber, _super);
    function StringIsPhoneOrFaxNumber() {
        var _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return t == null || (isNumber(t) && t.trim().length === 10); },
            error: "Invalid value"
        });
        return _this;
    }
    return StringIsPhoneOrFaxNumber;
}(BaseStringValidationRule));
//# sourceMappingURL=string-validation.js.map