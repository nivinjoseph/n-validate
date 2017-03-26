import * as assert from "assert";
import { Validator } from "../src/index";
import "n-ext";

suite("Basic validation", () =>
{
    interface TestVal
    {
        firstName: string;
        lastName: string;
        age: number;
        scores: Array<any>;
    }
    
    let testVal: TestVal;
    let validator: Validator<TestVal>;
    
    setup(() =>
    {
        testVal = {
            firstName: "Nivin",
            lastName: "Joseph",
            age: 31,
            scores: [200, 400, 800]
        };
        
        validator = new Validator<TestVal>();
        validator.for<string>("firstName")
            .isRequired()
            .ensure(t => t.startsWith("N")).withMessage("should begin with 'N'");
        validator.for<string>("lastName")
            .isOptional()
            .ensure(t => t.endsWith("h"));
    });
    
    
    test("should pass given a passing value", () =>
    {
        validator.validate(testVal);   
        assert.strictEqual(validator.isValid, true);
    });
    
    test("should fail given a failing value", () =>
    {
        testVal.firstName = "Kevin";
        validator.validate(testVal);
        assert.strictEqual(validator.isValid, false);
    });
});