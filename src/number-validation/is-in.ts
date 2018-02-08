import { ValidationRule } from "./../validation-rule";
import { BaseNumberValidationRule } from "./base-number-validation-rule";
import { given } from "@nivinjoseph/n-defensive";

// public
export function isIn(values: Array<number>): ValidationRule<number>
{
    return new NumberIsIn(values);
}

class NumberIsIn extends BaseNumberValidationRule
{
    public constructor(values: Array<number>)
    {
        given(values, "values").ensureHasValue();
        super();
        this.addValidationRule({
            validate: t => t == null || values.some(u => u === t),
            error: "Invalid value"
        });
    }
}