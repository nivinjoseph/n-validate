import { BaseNumberValidationRule } from "./base-number-validation-rule";
import { ValidationRule } from "./../validation-rule";
import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";

// public
export function hasMinValue(minValue: number): ValidationRule<number>
{
    return new NumberHasMinValue(minValue);
}

class NumberHasMinValue extends BaseNumberValidationRule
{
    public constructor(minValue: number)
    {
        given(minValue, "minValue").ensureHasValue();
        super();
        this.addValidationRule(
            {
                validate: t => t == null || t >= minValue,
                error: "Value cannot be less than {0}".format(minValue)
            });
    }
}