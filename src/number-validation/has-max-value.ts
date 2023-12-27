import { given } from "@nivinjoseph/n-defensive";
import { ValidationRule } from "./../validation-rule.js";
import { BaseNumberValidationRule } from "./base-number-validation-rule.js";

// public
export function hasMaxValue(maxValue: number): ValidationRule<number>
{
    return new NumberHasMaxValue(maxValue);
}

class NumberHasMaxValue extends BaseNumberValidationRule
{
    public constructor(maxValue: number)
    {
        given(maxValue, "maxValue").ensureHasValue();
        super();
        this.addValidationRule(
            {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                validate: t => t == null || t <= maxValue,
                error: `Value cannot be greater than ${maxValue}`
            });
    }
}