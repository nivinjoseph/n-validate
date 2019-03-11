import { BaseNumberValidationRule } from "./base-number-validation-rule";
import { ValidationRule } from "./../validation-rule";
import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";

// public
export function hasExactValue(exactValue: number): ValidationRule<number>
{
    return new NumberHasExactValue(exactValue);
}

class NumberHasExactValue extends BaseNumberValidationRule
{
    public constructor(exactValue: number)
    {
        given(exactValue, "exactValue").ensureHasValue();
        super();
        this.addValidationRule(
            {
                validate: t => t == null || t === exactValue,
                error: "Value has to be {0}".format(exactValue)
            });
    }
}