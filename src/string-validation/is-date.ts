import { given } from "@nivinjoseph/n-defensive";
import { DateTime } from "luxon";
import { ValidationRule } from "../validation-rule.js";
import { BaseStringValidationRule } from "./base-string-validation-rule.js";


// public
/**
 * 
 * @param format eg: YYYY-MM-DD  https://moment.github.io/luxon/#/formatting?id=table-of-tokens
 */
export function isDate(format: string): ValidationRule<string>
{
    return new StringIsDate(format);
}

class StringIsDate extends BaseStringValidationRule
{
    public constructor(format: string)
    {
        given(format, "format").ensureHasValue().ensureIsString();

        super();
        this.addValidationRule(
            {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                validate: t => t == null || DateTime.fromFormat(t, format).isValid,
                error: "Invalid date"
            });
    }
}