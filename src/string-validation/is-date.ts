import { ValidationRule } from "./../validation-rule";
import { BaseStringValidationRule } from "./base-string-validation-rule";
import { given } from "@nivinjoseph/n-defensive";
import * as moment from "moment";

// public
/**
 * 
 * @param format eg: YYYY-MM-DD
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
                validate: t => t == null || moment(t, format).isValid(),
                error: "Invalid date"
            });
    }
}