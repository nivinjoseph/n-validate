import { ValidationRule } from "./../validation-rule";
import { BaseStringValidationRule } from "./base-string-validation-rule";
import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";

// public
export function hasExactLength(exactLength: number): ValidationRule<string>
{
    return new StringHasExactLength(exactLength);
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