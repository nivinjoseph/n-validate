import * as assert from "assert";
import { Validator } from "../src/index";
import { ArgumentNullException, ArgumentException } from "@nivinjoseph/n-exception";
import "@nivinjoseph/n-ext";

suite("Basic validation", () =>
{
    interface TestVal
    {
        firstName?: string | null;
        lastName: string;
        age: number;
        scores: Array<any>;
        address?: any;
    }

    let testVal: TestVal;
    let validator: Validator<TestVal>;

    setup(() =>
    {
        testVal = {
            firstName: "Nivin",
            lastName: "Joseph",
            age: 31,
            scores: [200, 400, 800],
            address: {
                street: "15 Benton rd",
                province: "ON"
            }
        };

        validator = new Validator<TestVal>();
        validator.prop("firstName")
            .isRequired()
            .ensure(t => t.startsWith("N")).withMessage("should begin with 'N'");
        validator.prop("lastName")
            .isOptional()
            .ensure(t => t.endsWith("h"));
        validator.prop("age")
            .isRequired()
            .ensure(t => t >= 18).withMessage("should be greater than equal to 18");
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
    test("should give the correct error message given a failing value", () =>
    {
        testVal.age = 17;
        validator.validate(testVal);
        assert.strictEqual(validator.errors["age"], "should be greater than equal to 18");
    });
});


suite("Validator", () =>
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
    });


    suite("init", () =>
    {
        test("should init with no errors and with no property validators and should be valid", () =>
        {
            validator = new Validator<TestVal>();
            assert.strictEqual(validator.hasRules, false, "Should have no rules");
            assert.strictEqual(validator.hasErrors, false, "Should have no errors");
            assert.strictEqual(Object.keys(validator.errors).length, 0, "Should have no error messages");
            assert.strictEqual(validator.isValid, true, "Should be valid");
        });
    });


    suite("prop", () =>  
    {
        test("should create a validation rule for a given property", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName");
            assert.strictEqual(validator.hasRules, true, "Should have a rule");
            assert.strictEqual(validator.hasErrors, false, "Should have no errors");
            assert.strictEqual(validator.isValid, true, "Should be valid");
        });
        
        test("should throw an ArgumentNullException when given null", () =>
        {
            validator = new Validator<TestVal>();
            assert.throws(() =>
            {
                validator.prop(null as any);
            }, ArgumentNullException);
        });

        test("should throw an ArgumentException when property given is an empty string", () =>
        {
            validator = new Validator<TestVal>();
            assert.throws(() =>
            {
                validator.prop("" as any);
            }, ArgumentException);
        });
    });


    suite("validate", () =>
    {
        test("should create a validation rule for a given property in the object and should be valid", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").isRequired();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });


        test("should create a validation rule for a property not in the object and should be invalid", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("no-name" as any).isRequired();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });

        test("should throw an ArgumentNullException when validating null object", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").isRequired();
            assert.throws(() =>
            {
                validator.validate(null as any);
            }, ArgumentNullException);
        });

        test("should throw an ArgumentNullException when validating undifined object", () =>
        {
            const validator = new Validator<string>();
            validator.prop("firstName" as any);
            assert.throws(() =>
            {
                validator.validate(undefined as any);
            }, ArgumentNullException);
        });
    });
});



suite("PropertyValidator", () =>
{
    interface TestVal
    {
        firstName: string;
        lastName: string;
        age: number;
        scores: Array<number>;
        address?: object;
        active: boolean;
    }

    let testVal: TestVal;
    let validator: Validator<TestVal>;
    setup(() =>
    {
        testVal = {
            firstName: "Nivin",
            lastName: "Joseph",
            age: 31,
            scores: [200, 400, 800],
            address: {
                street: "15 Benton rd",
                province: "ON"
            },
            active: true
        };
    });

    
    suite("isRequired", () =>
    {
        
        test("should pass when the property is given in the object being vaildated", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").isRequired();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        
        test("should fail when the property is set to null in the object being validated", () =>
        {
            validator = new Validator<TestVal>();
            testVal.firstName = null as any;
            validator.prop("firstName").isRequired();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
        
        test("should fail when the property is set to undifined in object being validated", () =>
        {
            validator = new Validator<TestVal>();
            testVal.firstName = undefined as any;
            validator.prop("firstName").isRequired();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
        
        test("should fail when the property is not given in the object being validated", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("no-name" as any).isRequired();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
    });

    suite("ensureIsBoolean", () =>
    {
        test("should pass when the property being validated is a boolean value", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("active").isBoolean();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        
        test("should fail when the property being validated is not a boolean value", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop<any, boolean>("age").isBoolean();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
        
    });
    
    suite("ensureIsString", () =>
    {
        test("should pass when the property being validated is a string value", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").isString();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        test("should fail when the property being validated is not a string value", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop<any, string>("active").isString();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });

    });
    
    suite("ensureIsNumber", () =>
    {
        test("should pass when the property being validated is a number value", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("age").isNumber();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        test("should fail when the property being validated is not a number value", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop<any, number>("firstName").isNumber();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });

    });
    
    suite("ensureIsObject", () =>
    {
        test("should pass when the property being validated is a object value", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("address").isObject();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        test("should fail when the property being validated is not a object value", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop<any, object>("age").isObject();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });

    });
    
    suite("ensureIsArray", () =>
    {
        test("should pass when the property being validated is a array value", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("scores").isArray();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        test("should fail when the property being validated is not a array value", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop<any, Array<any>>("address").isArray();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });

    });
    
    suite("isOptional", () =>
    {
        test("should pass when the property is not given in the object being validated", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop<any, string>("no-name").isOptional();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
       
        test("should pass when the property is set to undefined in the object being validated", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").isOptional();
            testVal.firstName = undefined as any;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        test("should pass when the property is set to null in the object being validated", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").isOptional();
            testVal.firstName = null as any;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        test("should pass when the property is given in the object being validated", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").isOptional();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
    });


    suite("ensure", () =>
    {
        
        test("should pass when the property(string) is given in the object being validated does satisfy the given predicate", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").ensure(t => t.length >= 2);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        
        test("should fail when the property(string) is given in the object being validated doesn't satisfy the given predicate", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").ensure(t => t.length <= 2);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
        
        test("should throw an exception when the property is not given in the object being validated", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop<any, string>("no-name").ensure(t => t.length <= 2);
            assert.throws(() =>
            {
                validator.validate(testVal);    
            });     
        });
        
        test("should throw and exception when the property is set to null in the object being validated", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").ensure(t => t.length <= 2);
            testVal.firstName = null as any; 
            assert.throws(() =>
            {
                validator.validate(testVal);
            });
        });
        
        test("should pass when the property(array) is given in the object being validated does satisfy the given predicate", () =>
        {
            function check_array(array: ReadonlyArray<number>): boolean
            {
                let sum = 0;
                for (const a of array)
                {
                    sum += a;
                }
                return sum > 100;
            }
            validator = new Validator<TestVal>();
            validator.prop("scores").ensure(t => check_array(t));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        
        test("should fail when the value(array) given in the object being validated doesn't satisfy the given predicate", () =>
        {
            function check_array(array: ReadonlyArray<number>): boolean
            {
                let sum = 0;
                for (const a of array)
                {
                    sum += a;
                }
                return sum < 100;
            }
            validator = new Validator<TestVal>();
            validator.prop("scores").ensure(t => check_array(t));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
    });


    suite("ensureT", () =>
    {
       
        test("should pass when the property(string) given in the object being validated does satisfy the given predicate", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").ensureT(t => t.firstName.length >= 2);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
         
        test("should fail when the property(string) given in the object being validated doesn't satisfy the given predicate", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").ensureT(t => t.firstName.length <= 2);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
        
        test("should pass when the property(array) given in the object being validated doesn't satisfy the given predicate", () =>
        {
            function check_array(array: Array<any>): boolean
            {
                let sum = 0;
                for (const a of array)
                {
                    sum += a;
                }
                return sum > 100;
            }
            validator = new Validator<TestVal>();
            validator.prop("scores").ensureT(t => check_array(t.scores));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        
        test("should fail when the property(array) given in the object being validated doesn't satisfy the given predicate", () =>
        {
            function check_array(array: Array<any>): boolean
            {
                let sum = 0;
                for (const a of array)
                {
                    sum += a;
                }
                return sum < 100;
            }
            validator = new Validator<TestVal>();
            validator.prop("scores").ensureT(t => check_array(t.scores));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
    });


    suite("useValidationRule", () =>
    {
        
        test("should pass when the property given in the object being validated does satisfy the given validation rule predicate", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").useValidationRule({
                validate: (t) => t.startsWith("N"),
                error: "firstName Does not start with N"
            });
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true, "Should be valid");
            assert.strictEqual(validator.hasErrors, false, "Should have no errors");
        });

        test("should pass when the property given in the object being validated doesn't satisfy the given validation rule predicate", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").useValidationRule({
                validate: (t) => t.startsWith("N"),
                error: "firstName Does not start with N"
            });
            testVal.firstName = "John";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have errors");
            assert.strictEqual(validator.errors.getValue("firstName"), "firstName Does not start with N", "Should have the correct error message");
        });

    });


    suite("useValidator", () =>
    {
        test("should pass validation given 2 validators", () =>
        {
            const secondaryValidator: Validator<any> = new Validator<any>();
            secondaryValidator.prop("province").ensure(t => t === "ON");

            validator = new Validator<TestVal>();
            validator.prop("address").isRequired().useValidator(secondaryValidator);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);

        });

        test("should fail validation when secondary validator fails", () =>
        {
            const secondaryValidator: Validator<any> = new Validator<any>();
            secondaryValidator.prop("province").ensure(t => t !== "ON");

            validator = new Validator<TestVal>();
            validator.prop("address").isRequired().ensure(t => t.getValue("street") === "15 Benton rd").useValidator(secondaryValidator);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual((validator.errors.getValue("address") as Object).getValue("province"), "Invalid value", "Should have error message of the secondary validator");
        });

        test("should fail validation when primary validator fails", () =>
        {
            const secondaryValidator: Validator<any> = new Validator<any>();
            secondaryValidator.prop("province").ensure(t => t === "ON");

            validator = new Validator<TestVal>();
            validator.prop("address").isRequired().ensure(t => t.getValue("street") === "16 Benton rd").useValidator(secondaryValidator);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.errors.getValue("address"), "Invalid value", "Should have error message of the primary validator");

        });

        test("should fail validation when both validators fails", () =>
        {
            const secondaryValidator: Validator<any> = new Validator<any>();
            secondaryValidator.prop("province").ensure(t => t === "AB");

            validator = new Validator<TestVal>();
            validator.prop("address").isRequired().ensure(t => t.getValue("street") === "16 Benton rd").useValidator(secondaryValidator);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.errors.getValue("address"), "Invalid value", "Should have the error message of the primary validator");

        });

    });


    suite("when", () =>
    {
        test("should pass when the if condition is true and the object being validated does satisfy the given target validation rule", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").ensure(t => t === "Nivin").when(t => t.firstName.length > 2);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        
        test("should fail when the if condition is true and the object being validated doesn't satisfy the given target validation rule", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").ensure(t => t === "Shrey").when(t => t.firstName.length > 2);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
       
        test("should pass when the if condition is false and the object being validated does satisfy the given target validation rule", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").ensure(t => t === "Nivin").when(t => t.firstName.length === 2);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        
        test("should pass when the if condition is false and the object being validated doesn't satisfy the given target validation rule", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").ensure(t => t === "Shrey").when(t => t.firstName.length === 2);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
    });


    suite("chaining", () =>
    {
        test("should pass when the object being validated does satisfy the predicates of 2 ensures chained together", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName")
                .ensure(t => t.length > 2)
                .ensure(t => t === "Nivin");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
       
        test("should fail when the object being validated does satisfy the predicate of the first ensure and doesn't satisy the predicate of the seconnd ensure", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName")
                .ensure(t => t.length > 2)
                .ensure(t => t === "Shrey");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
       
        test("should pass when 2 enusures that are true and false respectively are chanied with a if(false) on the second", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName")
                .ensure(t => t.length > 2)
                .ensure(t => t === "Shrey").when(t => t.lastName === "Mahendru");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
       
        test("should pass when 2 enusures that are true and false respectively are chanied with a if(true) on the second in the object being validated", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName")
                .ensure(t => t.length > 2)
                .ensure(t => t === "Nivin").when(t => t.lastName === "Joseph");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        
        test("should pass when a given property is required and enusure is true in the object being validated", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName")
                .isRequired()
                .ensure(t => t === "Nivin");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
       
        test("should fail when a given property is required and enusure is false in the object being validated", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName")
                .isRequired()
                .ensure(t => t === "Shrey");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
      
        test("should pass when a property is optional and ensure is false and property is not given in the object being validated", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop<any, string>("middleName")
                .isOptional()
                .ensure(t => t === "mid-name");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
       
        test("should fail when a property is optional and ensure is false and property is given in the object being validated", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName")
                .isOptional()
                .ensure(t => t === "mid-name");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
    });


    suite("withMessage", () =>
    {    
        test("should fail with correct message when target validation rule doesn't satisfy for the object being validated", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop<any, string>("middleName")
                .isRequired().withMessage("middle name is required");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have errors");
            assert.strictEqual(validator.errors.getValue("middleName"), "middle name is required");
        });
       
        test("should fail with correct message of the 1st validation rule when target validations are false, true, true respectively for the object being validated", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName")
                .ensure(t => t === "Shrey").withMessage("First name is wrong")
                .ensure(t => t !== "")
                .ensure(t => t === "Name");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have errors");
            assert.strictEqual(validator.errors.getValue("firstName"), "First name is wrong", "Should have correct message");
        });
       
        test("should fail with correct message of the 2nd valudation rule when target validations are true, false, true respectively for the object being validated", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName")
                .isRequired().withMessage("First name is required")
                .ensure(t => t === "").withMessage("name can't be empty")
                .ensure(t => t === "Nivin");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have errors");
            assert.strictEqual(validator.errors.getValue("firstName"), "name can't be empty", "Should have correct message");
        });
        
        test("should fail with correct message of the 3rd rule when target validations are true, true, false respectively for the object being validated", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName")
                .isRequired().withMessage("First name is required")
                .ensure(t => t === "Nivin").withMessage("name is wrong")
                .ensure(t => t.length === 6).withMessage("name has to be 6 letters");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have errors");
            assert.strictEqual(validator.errors.getValue("firstName"), "name has to be 6 letters", "Should have a correct message");
        });
        
        test("should fail with correct message of the 1st rule when target validations are false, false, false respectively for the object being validated", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName")
                .ensure(t => t === "Shrey").withMessage("First name is not shrey")
                .ensure(t => t.length > 5).withMessage("name not greater than 5")
                .ensure(t => t.startsWith("S")).withMessage("name has to start with S");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have errors");
            assert.strictEqual(validator.errors.getValue("firstName"), "First name is not shrey");
        });
    });

}); 