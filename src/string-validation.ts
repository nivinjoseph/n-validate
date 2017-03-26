import BaseValidationRule from "./base-validation-rule";
import ValidationRule from "./validation-rule";
import "n-ext";
import given from "n-defensive";

export function hasMinLength(minLength: number): ValidationRule<string>
{
    return new StringHasMinLength(minLength);
}

export function hasMaxLength(maxLength: number): ValidationRule<string>
{
    return new StringHasMaxLength(maxLength);
}

export function hasExactLength(exactLength: number): ValidationRule<string>
{
    return new StringHasExactLength(exactLength);
}

export function stringIsIn(values: Array<string>): ValidationRule<string>;
export function stringIsIn(values: Array<string>, ignoreCase: boolean): ValidationRule<string>;
export function stringIsIn(values: Array<string>, ignoreCase?: boolean): ValidationRule<string>
{
    return new StringIsIn(values, ignoreCase);
}

export function stringIsNotIn(values: Array<string>): ValidationRule<string>;
export function stringIsNotIn(values: Array<string>, ignoreCase: boolean): ValidationRule<string>;
export function stringIsNotIn(values: Array<string>, ignoreCase?: boolean): ValidationRule<string>
{
    return new StringIsNotIn(values, ignoreCase);
}

export function isEmail(): ValidationRule<string>
{
    return new StringIsEmail();
}

export function containsOnlyNumbers(): ValidationRule<string>
{
    return new StringContainsOnlyNumbers();
}

export function isPhoneOrFaxNumber(): ValidationRule<string>
{
    return new StringIsPhoneOrFaxNumber();
}    


abstract class BaseStringValidationRule extends BaseValidationRule<string>
{
    protected constructor()
    {
        super();
        this.addValidationRule(
            {
                validate: t => typeof t === "string",
                error: "Invalid value"
            });
    }
}

class StringHasMinLength extends BaseStringValidationRule
{
    public constructor(minLength: number)
    {
        given(minLength, "minLength").ensureHasValue();
        super();
        this.addValidationRule(
            {
                validate: t => t == null || t.trim().length >= minLength,
                error: "Min length of {0} required".format(minLength)
            });
    }
}

class StringHasMaxLength extends BaseStringValidationRule
{
    public constructor(maxLength: number)
    {
        given(maxLength, "maxLength").ensureHasValue();
        super();
        this.addValidationRule(
            {
                validate: t => t == null || t.trim().length <= maxLength,
                error: "Max length of {0} required".format(maxLength)
            });
    }
}

class StringHasExactLength extends BaseStringValidationRule
{
    public constructor(exactLength: number)
    {
        given(exactLength, "exactLength").ensureHasValue();
        super();
        this.addValidationRule(
            {
                validate: t => t == null || t.trim().length === exactLength,
                error: "Exact length of {0} required".format(exactLength)
            });
    }
}

class StringIsIn extends BaseStringValidationRule
{
    public constructor(values: Array<string>);
    public constructor(values: Array<string>, ignoreCase: boolean);
    public constructor(values: Array<string>, ignoreCase?: boolean)
    {
        given(values, "values").ensureHasValue();
        super();
        this.addValidationRule(
            {
                validate: t => t == null || ignoreCase
                    ? values.some(v => v.trim().toLowerCase() === t.trim().toLowerCase())
                    : values.some(v => v.trim() === t.trim()),
                error: "Invalid value"
            });
    }
}

class StringIsNotIn extends BaseStringValidationRule
{
    public constructor(values: Array<string>);
    public constructor(values: Array<string>, ignoreCase: boolean);
    public constructor(values: Array<string>, ignoreCase?: boolean)
    {
        given(values, "values").ensureHasValue();
        super();
        this.addValidationRule(
            {
                validate: t => t == null || ignoreCase
                    ? values.every(v => v.trim().toLowerCase() !== t.trim().toLowerCase())
                    : values.every(v => v.trim() === t.trim()),
                error: "Invalid value"
            });
    }
}

class StringIsEmail extends BaseStringValidationRule
{
    public constructor()
    {
        super();
        this.addValidationRule(
            {
                validate: t =>
                {
                    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return t == null || re.test(t.trim());
                },
                error: "Invalid value"
            });
    }
}

function isNumber(value: any): boolean
{
    let parsed = +value.toString().trim();
    return !isNaN(parsed) && isFinite(parsed);
}

class StringContainsOnlyNumbers extends BaseStringValidationRule
{
    public constructor()
    {
        super();
        this.addValidationRule(
            {
                validate: t => t == null || isNumber(t),
                error: "Invalid value"
            });
    }
}

class StringIsPhoneOrFaxNumber extends BaseStringValidationRule
{
    public constructor()
    {
        super();
        this.addValidationRule(
            {
                validate: t => t == null || (isNumber(t) && t.trim().length === 10),
                error: "Invalid value"
            });
    }
}