import { BaseNumberValidationRule } from "./base-number-validation-rule";
import { ValidationRule } from "./../validation-rule";
import { given } from "@nivinjoseph/n-defensive";

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