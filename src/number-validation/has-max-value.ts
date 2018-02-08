import { BaseNumberValidationRule } from "./base-number-validation-rule";
import { ValidationRule } from "./../validation-rule";
import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";

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
                validate: t => t == null || t <= maxValue,
                error: "Value cannot be greater than {0}".format(maxValue)
            });
    }
}