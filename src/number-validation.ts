import BaseValidationRule from "./base-validation-rule";
import ValidationRule from "./validation-rule";
import "n-ext";
import given from "n-defensive";

export function hasMinValue(minValue: number): ValidationRule<number>
{
    return new NumberHasMinValue(minValue);
}

export function hasMaxValue(maxValue: number): ValidationRule<number>
{
    return new NumberHasMaxValue(maxValue);
}

export function isIn(values: Array<number>): ValidationRule<number>
{
    return new NumberIsIn(values);
}

export function isNotIn(values: Array<number>): ValidationRule<number>
{
    return new NumberIsNotIn(values);
}


abstract class BaseNumberValidationRule extends BaseValidationRule<number>
{
    public constructor()
    {
        super();
        this.addValidationRule(
            {
                validate: (t: number) => typeof t === "number",
                error: "Invalid value"
            });
    }
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

class NumberIsNotIn extends BaseNumberValidationRule
{
    public constructor(values: Array<number>)
    {
        given(values, "values").ensureHasValue();
        super();
        this.addValidationRule({
            validate: t => t == null || values.every(u => u === t),
            error: "Invalid value"
        });
    }
}