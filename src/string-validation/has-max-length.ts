import { ValidationRule } from "./../validation-rule";
import { BaseStringValidationRule } from "./base-string-validation-rule";
import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";

// public
export function hasMaxLength(maxLength: number): ValidationRule<string>
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