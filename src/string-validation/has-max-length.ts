import { given } from "@nivinjoseph/n-defensive";
import { ValidationRule } from "./../validation-rule.js";
import { BaseStringValidationRule } from "./base-string-validation-rule.js";

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
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                validate: t => t == null || t.trim().length <= maxLength,
                error: `Max length of ${maxLength} required`
            });
    }
}