import { ValidationRule } from "./../validation-rule";
import { BaseStringValidationRule } from "./base-string-validation-rule";
import { given } from "@nivinjoseph/n-defensive";

// public
export function hasMinLength(minLength: number): ValidationRule<string>
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
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                validate: t => t == null || t.trim().length >= minLength,
                error: `Min length of ${minLength} required`
            });
    }
}