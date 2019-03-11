import { ValidationRule } from "./../validation-rule";
import { BaseStringValidationRule } from "./base-string-validation-rule";
import { given } from "@nivinjoseph/n-defensive";

// public
export function matchesRegex(regex: RegExp): ValidationRule<string>
{
    return new StringMatchesRegex(regex);
}

class StringMatchesRegex extends BaseStringValidationRule
{
    public constructor(regex: RegExp)
    {
        given(regex, "regex").ensureHasValue().ensureIsType(RegExp);

        super();
        this.addValidationRule(
            {
                validate: t => t == null || regex.test(t),
                error: "Invalid format"
            });
    }
}