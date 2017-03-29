import * as assert from "assert";
import { Validator } from "../src/index";
import { ApplicationException, ArgumentNullException, ArgumentException, InvalidArgumentException } from "n-exception";
import "n-ext";

suite("Basic validation", () =>
{
    interface TestVal
    {
        firstName: string;
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
        validator.for<string>("firstName")
            .isRequired()
            .ensure(t => t.startsWith("N")).withMessage("should begin with 'N'");
        validator.for<string>("lastName")
            .isOptional()
            .ensure(t => t.endsWith("h"));
        validator.for<number>("age")
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

        // test type of created Validatror
        test("should init with no errors and no property validators and should be valid", () =>
        {
            validator = new Validator<TestVal>();
            assert.strictEqual(validator.hasRules, false, "Should have no rules");
            assert.strictEqual(validator.hasErrors, false, "Should have no errors");
            assert.strictEqual(Object.keys(validator.errors).length, 0, "Should have no error messages");
            assert.strictEqual(validator.isValid, true, "Should be valid");
        });
    });


    suite("for", () =>   // returns PropertyValidator<T, TProperty>
    {

        test("should create a validation rule for a varibale", () =>
        {
            validator = new Validator<TestVal>();
            validator.for("firstName");
            assert.strictEqual(validator.hasRules, true, "Should have a rule");
            assert.strictEqual(validator.hasErrors, false, "Should have no errors");
            assert.strictEqual(Object.keys(validator.errors).length, 0, "Should have no error messages");
            assert.strictEqual(validator.isValid, true, "Should be valid");
        });

        // for null
        test("should throw an ArgumentNullException when given null", () =>
        {
            validator = new Validator<TestVal>();
            assert.throws(() =>
            {
                validator.for(null);
            }, ArgumentNullException);
        });

        // for empty string
        test("should thorw an InvalidArgumentException when given a empty string", () =>
        {
            validator = new Validator<TestVal>();
            assert.throws(() =>
            {
                validator.for("");
            }, InvalidArgumentException);
        });

    });


    suite("vaildate", () =>
    {
        test("should create a validation rule for a varibale and should be valid", () =>
        {
            validator = new Validator<TestVal>();
            validator.for("firstName").isRequired();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });


        test("should create a validation rule for a varibale and should be invalid", () =>
        {
            validator = new Validator<TestVal>();
            validator.for("no-name").isRequired();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });

        test("should throw an ArgumentNullException when validating null object", () =>
        {
            validator = new Validator<TestVal>();
            validator.for("firstName").isRequired();
            assert.throws(() =>
            {
                validator.validate(null);
            }, ArgumentNullException);
        });

        test("should throw an ArgumentNullException when validating undifined object", () =>
        {
            let validator = new Validator<string>();
            validator.for("firstName");
            assert.throws(() =>
            {
                validator.validate(undefined);
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
    });

    // isRequired(): PropertyValidator<T, TProperty>;
    suite("isRequired", () =>
    {
        // passes whren the value is given
        test("should pass when the value is given", () =>
        {
            validator = new Validator<TestVal>();
            validator.for("firstName").isRequired();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        // fails when the value is null
        test("should fail when the value is not given", () =>
        {
            validator = new Validator<TestVal>();
            testVal.firstName = null;
            validator.for("firstName").isRequired();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
        // fails when the value is undefined
        test("should fail when the value is undefined", () =>
        {
            validator = new Validator<TestVal>();
            testVal.firstName = undefined;
            validator.for("firstName").isRequired();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
        // fails when the variable is not in the object 
        test("should fail when the value is not in the object", () =>
        {
            validator = new Validator<TestVal>();
            validator.for("no-name").isRequired();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
    });


    suite("isOptional", () =>
    {
        // passes when value not provided in the object.
        test("should pass when the varibale is not in the object", () =>
        {
            validator = new Validator<TestVal>();
            validator.for("no-name").isOptional();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        // fails when the value is undefined
        test("should pass when the value is undefined", () =>
        {
            validator = new Validator<TestVal>();
            validator.for("firstName").isOptional();
            testVal.firstName = undefined;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        // passes when value is null.
        test("should pass when the value is null", () =>
        {
            validator = new Validator<TestVal>();
            validator.for("firstName").isOptional();
            testVal.firstName = null;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        test("should pass when the value is deinfed in the object", () =>
        {
            validator = new Validator<TestVal>();
            validator.for("firstName").isOptional();
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
    });


    suite("ensure", () =>
    {
        // test ensure on given string that will pass
        test("should pass when the value(string) given satisfy the given predicate", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").ensure(t => t.length >= 2);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        // test ensure on given string that will fail 
        test("should fail when the value(string) given doesn't satisfy the given predicate", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").ensure(t => t.length <= 2);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
        // test ensure on an array that will pass
        test("should pass when the value(array) given satisfy the given predicate function", () =>
        {
            function check_array(array: Array<any>): boolean
            {
                let sum: number = 0;
                for (let a of array)
                {
                    sum += a;
                }
                return sum > 100;
            }
            validator = new Validator<TestVal>();
            validator.for<Array<any>>("scores").ensure(t => check_array(t));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        // test ensure on an array that will fail
        test("should fail when the value(array) given doesn't satisfy the given predicate function", () =>
        {
            function check_array(array: Array<any>): boolean
            {
                let sum: number = 0;
                for (let a of array)
                {
                    sum += a;
                }
                return sum < 100;
            }
            validator = new Validator<TestVal>();
            validator.for<Array<any>>("scores").ensure(t => check_array(t));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
    });


    suite("ensureT", () =>
    {
        // test ensureT on given string that will pass
        test("should pass when the value(string) given satisfy the given predicate", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").ensureT(t => t.firstName.length >= 2);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        // test ensureT on given string that will fail 
        test("should fail when the value(string) given doesn't satisfy the given predicate", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").ensureT(t => t.firstName.length <= 2);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
        // test ensureT on an array that will pass
        test("should pass when the value(array) given satisfy the given predicate function", () =>
        {
            function check_array(array: Array<any>): boolean
            {
                let sum: number = 0;
                for (let a of array)
                {
                    sum += a;
                }
                return sum > 100;
            }
            validator = new Validator<TestVal>();
            validator.for<Array<any>>("scores").ensureT(t => check_array(t.scores)); // for is kinda redudndant here maybe ?
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        // test ensureT on an array that will fail
        test("should fail when the value(array) given doesn't satisfy the given predicate function", () =>
        {
            function check_array(array: Array<any>): boolean
            {
                let sum: number = 0;
                for (let a of array)
                {
                    sum += a;
                }
                return sum < 100;
            }
            validator = new Validator<TestVal>();
            validator.for<Array<any>>("scores").ensureT(t => check_array(t.scores));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
    });


    suite("useValidationRule", () =>
    {
        // create a validation rule that passes given a value
        test("should pass when the value(string) given satisfy the given Validation Rule", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").useValidationRule({
                validate: (t) => t[0] === "N",
                error: "firstName Does not start with N"
            });
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true, "Should be valid");
            assert.strictEqual(validator.hasErrors, false, "Should have no errors");
        });

        test("should pass when the value(string) given doesn't satisfy the given Validation Rule", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").useValidationRule({
                validate: (t) => t[0] === "N",
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
            let secondaryValidator: Validator<any> = new Validator<any>();
            secondaryValidator.for<string>("province").ensure(t => t === "ON");

            validator = new Validator<TestVal>();
            validator.for<object>("address").isRequired().useValidator(secondaryValidator);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);

        });

        test("should fail validation when secondary validator fails", () =>
        {
            let secondaryValidator: Validator<any> = new Validator<any>();
            secondaryValidator.for<string>("province").ensure(t => t !== "ON");

            validator = new Validator<TestVal>();
            validator.for<object>("address").isRequired().ensure(t => t.getValue("street") === "15 Benton rd").useValidator(secondaryValidator);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.errors.getValue("address").getValue("province"), "Invalid value", "Should have error message of the secondary validator");
        });

        test("should fail validation when primary validator fails", () =>
        {
            let secondaryValidator: Validator<any> = new Validator<any>();
            secondaryValidator.for<string>("province").ensure(t => t === "ON");

            validator = new Validator<TestVal>();
            validator.for<object>("address").isRequired().ensure(t => t.getValue("street") === "16 Benton rd").useValidator(secondaryValidator);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.errors.getValue("address"), "Invalid value", "Should have error message of the primary validator");

        });

        test("should fail validation when both validators fails", () =>
        {
            let secondaryValidator: Validator<any> = new Validator<any>();
            secondaryValidator.for<string>("province").ensure(t => t === "AB");

            validator = new Validator<TestVal>();
            validator.for<object>("address").isRequired().ensure(t => t.getValue("street") === "16 Benton rd").useValidator(secondaryValidator);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.errors.getValue("address"), "Invalid value", "Should have the error message of the primary validator");

        });

    });


    suite("if", () =>
    {
        // if without target validation rule an ApplicationException
        test("should throw an ApplicationException when no target validation rule is given", () =>
        {
            validator = new Validator<TestVal>();
            assert.throws(
                () =>
                {
                    validator.for<string>("firstName").if(t => t.firstName.length <= 2);
                }, ApplicationException);
        });
        // if(cond = true) with a target that paseses 
        test("should pass when the if condition is true and the target validation rule is true", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").ensure(t => t === "Nivin").if(t => t.firstName.length > 2);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        // if(cond = true) with a target that fails 
        test("should fail when the if condition is true and the target validation rule is false", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").ensure(t => t === "Shrey").if(t => t.firstName.length > 2);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
        // if(cond = false) with a target that paseses 
        test("should pass when the if condition is false and the target validation rule is true", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").ensure(t => t === "Nivin").if(t => t.firstName.length === 2);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        // if(cond = false) with a target that fails
        test("should pass when the if condition is false and the target validation rule is false", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").ensure(t => t === "Shrey").if(t => t.firstName.length === 2);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
    });


    suite("chaining", () =>
    {
        // 2 ensure, all pass
        test("should pass when 2 enusures that are true are chanied", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName")
                .ensure(t => t.length > 2)
                .ensure(t => t === "Nivin");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        // 2 ensures, one fails
        test("should fail when 2 enusures that are true and false respectively are chanied", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName")
                .ensure(t => t.length > 2)
                .ensure(t => t === "Shrey");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
        // 2 ensures with if on the second where if cond false 
        test("should pass when 2 enusures that are true and false respectively are chanied with a if(false) on the second", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName")
                .ensure(t => t.length > 2)
                .ensure(t => t === "Shrey").if(t => t.lastName === "Mahendru");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        // 2 ensure with if on the second where if cond true 
        test("should pass when 2 enusures that are true and false respectively are chanied with a if(true) on the second", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName")
                .ensure(t => t.length > 2)
                .ensure(t => t === "Nivin").if(t => t.lastName === "Joseph");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        // is rquired with ensure, passes 
        test("should pass when a given variable is required and enusure is true", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName")
                .isRequired()
                .ensure(t => t === "Nivin");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        // is required with ensure, fails
        test("should fail when a given variable is required and enusure is false", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName")
                .isRequired()
                .ensure(t => t === "Shrey");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
        // is optional with ensure, passes
        test("should pass when a variable is optional and enusure is false and variable is not present", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("middleName")
                .isOptional()
                .ensure(t => t === "mid-name");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        // is optional wiith ensurem, fails
        test("should fail when a variable is optional and enusure is false and variable is present", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName")
                .isOptional()
                .ensure(t => t === "mid-name");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
        });
    });


    suite("withMessage", () =>
    {
        // no rule ApplicationException
        test("should thorw an Application error when no target validation rule given", () =>
        {
            validator = new Validator<TestVal>();
            assert.throws(() =>
            {
                validator.for<string>("firstName").withMessage("Message check");
            }, ApplicationException);
        });
        // 1 validation rule is false check the right message
        test("should fail with correct message when target validation rule given is false ", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("middleName")
                .isRequired().withMessage("middle name is required");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have errors");
            assert.strictEqual(validator.errors.getValue("middleName"), "middle name is required");
        });
        // 3 rules with messages, 1st fails check the right message
        test("should fail with correct message of the 1st rule when target validations are false, true, true respectively", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName")
                .ensure(t => t === "Shrey").withMessage("First name is wrong")
                .ensure(t => t !== "")
                .ensure(t => t === "Name");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have errors");
            assert.strictEqual(validator.errors.getValue("firstName"), "First name is wrong");
        });
        // 3 rules with messages, 2nd fails check the right message
        test("should fail with correct message of the 2nd rule when target validations are true, false, true respectively", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName")
                .isRequired().withMessage("First name is required")
                .ensure(t => t === "").withMessage("name can't be empty")
                .ensure(t => t === "Nivin");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have errors");
            assert.strictEqual(validator.errors.getValue("firstName"), "name can't be empty");
        });
        // 3 rules with messages, 3rn fails check the right message
        test("should fail with correct message of the 3rd rule when target validations are true, true, false respectively", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName")
                .isRequired().withMessage("First name is required")
                .ensure(t => t === "Nivin").withMessage("name is wrong")
                .ensure(t => t.length === 6).withMessage("name has to be 6 letters");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have errors");
            assert.strictEqual(validator.errors.getValue("firstName"), "name has to be 6 letters");
        });
        // 3 rules with messages, all fails check rigth messages 
        test("should fail with correct message of the 1st rule when target validations are false, false, false respectively", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName")
                .ensure(t => t === "Shrey").withMessage("First name is not shrey")
                .ensure(t => t.length > 5).withMessage("name not greater than 5")
                .ensure(t => t[0] === "S").withMessage("name has to start with S");
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have errors");
            assert.strictEqual(validator.errors.getValue("firstName"), "First name is not shrey");
        });
    });

}); 