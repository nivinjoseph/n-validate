import * as assert from "assert";
import { strval, Validator } from "../src/index";

suite("String validation", () =>
{
    interface TestVal
    {
        firstName: string;
        lastName: string;
        age: string;
        scores?: Array<any>;
        address?: any;
        phone: string;
        email: string;
    }

    let testVal: TestVal;
    let validator: Validator<TestVal>;
    
    setup(() =>
    {
        testVal = {
            firstName: "John",
            lastName: "doh",
            age: "31",
            scores: ["200", "400", "800"], 
            phone: "1112223456",
            email: "test@test.com"
        };
    });
    
    suite("hasMinLength", () =>
    {
        
        test("should pass when the property of the object being validated has length greater than 3", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").useValidationRule(strval.hasMinLength(3));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        
        test("should fail when the property of the object being validated has length less than 3", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").useValidationRule(strval.hasMinLength(3));
            testVal.firstName = "Jo";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Min length of 3 required", "Should have a correct message");
        });
        
        test("should fail when the property of the object being validated is an empty string", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").useValidationRule(strval.hasMinLength(3));
            testVal.firstName = "";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Min length of 3 required", "Should have a correct message");
        });
        
        test("should fail when the property of the object being validated is null", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").useValidationRule(strval.hasMinLength(3));
            testVal.firstName = null;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Invalid value", "Should have a correct message");
        });
    });
    
    
    suite("hasMaxLength", () =>
    {
        test("should pass when the property of the object being validated has length less than 5", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").useValidationRule(strval.hasMaxLength(5));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        test("should fail when the property of the object being validated has length greater than 5", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").useValidationRule(strval.hasMaxLength(5));
            testVal.firstName = "thisIsAVeryLongName";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Max length of 5 required", "Should have a correct message");
        });

        test("should pass when the property of the object being validated is an empty string", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").useValidationRule(strval.hasMaxLength(5));
            testVal.firstName = "";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        test("should fail when the property of the object being validated is null", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").useValidationRule(strval.hasMaxLength(5));
            testVal.firstName = null;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Invalid value", "Should have a correct message");
        });
    });
    
    
    suite("hasExactLength", () =>
    {
        test("should pass when the property of the object being validated has length exactly 4", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").useValidationRule(strval.hasExactLength(4));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        test("should fail when the property of the object being validated has length greater than 4", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").useValidationRule(strval.hasExactLength(4));
            testVal.firstName = "thisIsAVeryLongName";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Exact length of 4 required", "Should have a correct message");
        });
        
        test("should fail when the property of the object being validated has length less than 4", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").useValidationRule(strval.hasExactLength(4));
            testVal.firstName = "Jo";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Exact length of 4 required", "Should have a correct message");
        });
        
        test("should pass when the property of the object being validated is an empty string", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").useValidationRule(strval.hasExactLength(4));
            testVal.firstName = "";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Exact length of 4 required", "Should have a correct message");
        });

        test("should fail when the property of the object being validated is null", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("firstName").useValidationRule(strval.hasExactLength(4));
            testVal.firstName = null;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Invalid value", "Should have a correct message");
        });
    });
    
    
    suite("isIn", () =>
    {
        
        test("should pass when the property of the object being validated is in the given set", () =>
        {
            validator = new Validator<TestVal>();
            let set: string[] = ["Jo", "J", "test", "John"]; 
            validator.for<string>("firstName").useValidationRule(strval.isIn(set));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        
        test("should fail when the property of the object being validated is not in the given set", () =>
        {
            validator = new Validator<TestVal>();
            let set: string[] = ["Jo", "J", "test"];
            validator.for<string>("firstName").useValidationRule(strval.isIn(set));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Invalid value", "Should have a correct message");
        });
        
        test("should fail when the given set empty", () =>
        {
            validator = new Validator<TestVal>();
            let set: string[] = [];
            validator.for<string>("firstName").useValidationRule(strval.isIn(set));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Invalid value", "Should have a correct message");
        });
        
        test("should pass when the property of the object being validated is null and is in the given set", () =>
        {
            // TODO: fix this functions it fails for this case
            validator = new Validator<TestVal>();
            let set: string[] = ["Jo", "J", "test", null];
            validator.for<string>("firstName").useValidationRule(strval.isIn(set));
            testVal.firstName = null;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true, "Should be valid");
        });
        
        test("should pass when the property of the object being validated is in the given set(ignoreCase =true)", () =>
        {
            validator = new Validator<TestVal>();
            let set: string[] = ["Jo", "J", "test", "JOHN"];
            validator.for<string>("firstName").useValidationRule(strval.isIn(set, true));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        
    });
    
    
    suite("isNotIn", () =>
    {
        test("should pass when the property of the object being validated is not in the given set", () =>
        {
            validator = new Validator<TestVal>();
            let set: string[] = ["Jo", "J", "test"];
            validator.for<string>("firstName").useValidationRule(strval.isNotIn(set));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        test("should fail when the property of the object being validated is in the given set", () =>
        {
            validator = new Validator<TestVal>();
            let set: string[] = ["Jo", "J", "test", "John"];
            validator.for<string>("firstName").useValidationRule(strval.isNotIn(set));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Invalid value", "Should have a correct message");
        });

        test("should pass when the given set empty", () =>
        {
            validator = new Validator<TestVal>();
            let set: string[] = [];
            validator.for<string>("firstName").useValidationRule(strval.isNotIn(set));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        test("should fail when the property of the object being validated is null and is in the given set", () =>
        {
            validator = new Validator<TestVal>();
            let set: string[] = ["Jo", "J", "test", null]; 
            validator.for<string>("firstName").useValidationRule(strval.isNotIn(set));
            testVal.firstName = null;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Invalid value", "Should have a correct message");
        });
        
        test("should pass when the property of the object being validated is null and is not in the given set", () =>
        {
            // TODO: fix this functions it fails for this case
            validator = new Validator<TestVal>();
            let set: string[] = ["Jo", "J", "test"]; 
            validator.for<string>("firstName").useValidationRule(strval.isNotIn(set));
            testVal.firstName = null;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        
        test("should fail when the property of the object being validated is in the given set(ignoreCase =true)", () =>
        {
            validator = new Validator<TestVal>();
            let set: string[] = ["Jo", "J", "test", "JOHN"];
            validator.for<string>("firstName").useValidationRule(strval.isNotIn(set, true));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Invalid value", "Should have a correct message");
        });
    });
    
    
    suite("containsOnlyNumbers", () =>
    {
        test("should pass when the property of the object being validated contain only numbers", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("age").useValidationRule(strval.containsOnlyNumbers());
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        test("should fail when the property of the object being validated contains no numbers", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("age").useValidationRule(strval.containsOnlyNumbers());
            testVal.age = "noage";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("age"), "Invalid value", "Should have a correct message");
        });
        
        test("should fail when the property of the object being validated contains numbers and letters", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("age").useValidationRule(strval.containsOnlyNumbers());
            testVal.age = "25years";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("age"), "Invalid value", "Should have a correct message");
        });
        
        test("should fail when the property of the object being validated is an empty string", () =>
        {
            // TODO: fix this functions it fails for this case
            validator = new Validator<TestVal>();
            validator.for<string>("age").useValidationRule(strval.containsOnlyNumbers());
            testVal.age = "";
            // JavaScript interprets an empty string as a 0, which then fails the isNAN test. As well as isFinite test.
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false , "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("age"), "Invalid value", "Should have a correct message");
        });

        test("should fail when the property of the object being validated is null", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("age").useValidationRule(strval.containsOnlyNumbers());
            testVal.age = null;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Shoul be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("age"), "Invalid value", "Should have a correct message");
        });
    });
    
    
    suite("isPhoneNumber", () =>
    {
        test("should pass when the property of the object being validated is a valid phone number", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("phone").useValidationRule(strval.isPhoneNumber());
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        test("should fail when the property of the object being validated contains lettets", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("phone").useValidationRule(strval.isPhoneNumber());
            testVal.phone = "1sa4567292";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("phone"), "Invalid value", "Should have a correct message");
        });
        
        test("should fail when the property of the object being validated has length less than 10", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("phone").useValidationRule(strval.isPhoneNumber());
            testVal.phone = "1232112";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("phone"), "Invalid value", "Should have a correct message");
        });
        
        test("should fail when the property of the object being validated has length greater than 10", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("phone").useValidationRule(strval.isPhoneNumber());
            testVal.phone = "12321231231231212";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("phone"), "Invalid value", "Should have a correct message");
        });


        test("should fail when the property of the object being validated is an empty string", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("phone").useValidationRule(strval.isPhoneNumber());
            testVal.phone = "";
            // JavaScript interprets an empty string as a 0, which then fails the isNAN test. As well as isFinite test.
            // but here it passes cause of the length check in the rule.
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("phone"), "Invalid value", "Should have a correct message");
        });

        test("should fail when the property of the object being validated is null", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("phone").useValidationRule(strval.isPhoneNumber());
            testVal.phone = null;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Shoul be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("phone"), "Invalid value", "Should have a correct message");
        });
    });
    
    
    suite("isEmail", () =>
    {
        test("should pass when the property of the object being validated is a valid email", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("email").useValidationRule(strval.isEmail());
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        
        test("should fail when the property of the object being validated is a invalid email", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("email").useValidationRule(strval.isEmail());
            testVal.email = "test.com";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("email"), "Invalid value", "Should have a correct message");
        });
        
        test("should fail when the property of the object being validated is a empty string", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("email").useValidationRule(strval.isEmail());
            testVal.email = "";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("email"), "Invalid value", "Should have a correct message");
        });
        
        test("should fail when the property of the object being validated is a empty string", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("email").useValidationRule(strval.isEmail());
            testVal.email = null;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("email"), "Invalid value", "Should have a correct message");
        });
        
        test("should pass when the property of the object being validated is a valid email", () =>
        {
            validator = new Validator<TestVal>();
            validator.for<string>("email").useValidationRule(strval.isEmail());
            testVal.email = "test1.tester@mail.tester.ca";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });
        
    });
});