import ValidationRule from "./../validation-rule";
import BaseStringValidationRule from "./base-string-validation-rule";
import given from "n-defensive";
import "n-ext";

// public
export default function hasMinLength(minLength: number): ValidationRule<string>
{
    return new StringHasMinLength(minLength);
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