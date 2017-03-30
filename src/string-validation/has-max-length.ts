import ValidationRule from "./../validation-rule";
import BaseStringValidationRule from "./base-string-validation-rule";
import given from "n-defensive";
import "n-ext";

// public
export default function hasMaxLength(maxLength: number): ValidationRule<string>
{
    return new StringHasMaxLength(maxLength);
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