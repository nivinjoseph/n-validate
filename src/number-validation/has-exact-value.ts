import { given } from "@nivinjoseph/n-defensive";
import { ValidationRule } from "./../validation-rule.js";
import { BaseNumberValidationRule } from "./base-number-validation-rule.js";

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
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                validate: t => t == null || t === exactValue,
                error: `Value has to be ${exactValue}`
            });
    }
}