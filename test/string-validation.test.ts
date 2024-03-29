import assert from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { strval, Validator } from "../src/index.js";

await describe("String validation", async () =>
{
    interface TestVal
    {
        firstName?: string | null;
        lastName: string;
        age: string;
        scores?: Array<any>;
        address?: any;
        phone: string;
        email: string;
        dob: string;
    }

    let testVal: TestVal;
    let validator: Validator<TestVal>;

    beforeEach(() =>
    {
        testVal = {
            firstName: "John",
            lastName: "doh",
            age: "31",
            scores: ["200", "400", "800"],
            phone: "1112223456",
            email: "test@test.com",
            dob: "1955-04-16" // yyyy-MM-dd
        };
    });

    await describe("hasMinLength", async () =>
    {

        await test("should pass when the property of the object being validated has length greater than 3", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").useValidationRule(strval.hasMinLength(3));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        await test("should fail when the property of the object being validated has length less than 3", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").useValidationRule(strval.hasMinLength(3));
            testVal.firstName = "Jo";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Min length of 3 required", "Should have a correct message");
        });

        await test("should fail when the property of the object being validated is an empty string", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").useValidationRule(strval.hasMinLength(3));
            testVal.firstName = "";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Min length of 3 required", "Should have a correct message");
        });

        await test("should fail when the property of the object being validated is null", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").useValidationRule(strval.hasMinLength(3));
            testVal.firstName = null;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Invalid value", "Should have a correct message");
        });
    });


    await describe("hasMaxLength", async () =>
    {
        await test("should pass when the property of the object being validated has length less than 5", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").useValidationRule(strval.hasMaxLength(5));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        await test("should fail when the property of the object being validated has length greater than 5", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").useValidationRule(strval.hasMaxLength(5));
            testVal.firstName = "thisIsAVeryLongName";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Max length of 5 required", "Should have a correct message");
        });

        await test("should pass when the property of the object being validated is an empty string", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").useValidationRule(strval.hasMaxLength(5));
            testVal.firstName = "";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        await test("should fail when the property of the object being validated is null", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").useValidationRule(strval.hasMaxLength(5));
            testVal.firstName = null;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Invalid value", "Should have a correct message");
        });
    });


    await describe("hasExactLength", async () =>
    {
        await test("should pass when the property of the object being validated has length exactly 4", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").useValidationRule(strval.hasExactLength(4));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        await test("should fail when the property of the object being validated has length greater than 4", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").useValidationRule(strval.hasExactLength(4));
            testVal.firstName = "thisIsAVeryLongName";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Exact length of 4 required", "Should have a correct message");
        });

        await test("should fail when the property of the object being validated has length less than 4", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").useValidationRule(strval.hasExactLength(4));
            testVal.firstName = "Jo";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Exact length of 4 required", "Should have a correct message");
        });

        await test("should pass when the property of the object being validated is an empty string", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").useValidationRule(strval.hasExactLength(4));
            testVal.firstName = "";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Exact length of 4 required", "Should have a correct message");
        });

        await test("should fail when the property of the object being validated is null", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("firstName").useValidationRule(strval.hasExactLength(4));
            testVal.firstName = null;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Invalid value", "Should have a correct message");
        });
    });


    await describe("isIn", async () =>
    {

        await test("should pass when the property of the object being validated is in the given set", () =>
        {
            validator = new Validator<TestVal>();
            const set: Array<string> = ["Jo", "J", "test", "John"];
            validator.prop("firstName").useValidationRule(strval.isIn(set));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        await test("should fail when the property of the object being validated is not in the given set", () =>
        {
            validator = new Validator<TestVal>();
            const set: Array<string> = ["Jo", "J", "test"];
            validator.prop("firstName").useValidationRule(strval.isIn(set));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Invalid value", "Should have a correct message");
        });

        await test("should fail when the given set empty", () =>
        {
            validator = new Validator<TestVal>();
            const set: Array<string> = [];
            validator.prop("firstName").useValidationRule(strval.isIn(set));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Invalid value", "Should have a correct message");
        });

        await test("should pass when the property of the object being validated is in the given set(ignoreCase =true)", () =>
        {
            validator = new Validator<TestVal>();
            const set: Array<string> = ["Jo", "J", "test", "JOHN"];
            validator.prop("firstName").useValidationRule(strval.isIn(set, true));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

    });


    await describe("isNotIn", async () =>
    {
        await test("should pass when the property of the object being validated is not in the given set", () =>
        {
            validator = new Validator<TestVal>();
            const set: Array<string> = ["Jo", "J", "test"];
            validator.prop("firstName").useValidationRule(strval.isNotIn(set));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        await test("should fail when the property of the object being validated is in the given set", () =>
        {
            validator = new Validator<TestVal>();
            const set: Array<string> = ["Jo", "J", "test", "John"];
            validator.prop("firstName").useValidationRule(strval.isNotIn(set));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Invalid value", "Should have a correct message");
        });

        await test("should pass when the given set empty", () =>
        {
            validator = new Validator<TestVal>();
            const set: Array<string> = [];
            validator.prop("firstName").useValidationRule(strval.isNotIn(set));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        await test("should fail when the property of the object being validated is null and is in the given set", () =>
        {
            validator = new Validator<TestVal>();
            const set: Array<string> = ["Jo", "J", "test", null as any];
            validator.prop("firstName").useValidationRule(strval.isNotIn(set));
            testVal.firstName = null;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Invalid value", "Should have a correct message");
        });

        await test("should fail when the property of the object being validated is in the given set(ignoreCase =true)", () =>
        {
            validator = new Validator<TestVal>();
            const set: Array<string> = ["Jo", "J", "test", "JOHN"];
            validator.prop("firstName").useValidationRule(strval.isNotIn(set, true));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false);
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("firstName"), "Invalid value", "Should have a correct message");
        });
    });


    await describe("containsOnlyNumbers", async () =>
    {
        await test("should pass when the property of the object being validated contain only numbers", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("age").useValidationRule(strval.containsOnlyNumbers());
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        await test("should fail when the property of the object being validated contains no numbers", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("age").useValidationRule(strval.containsOnlyNumbers());
            testVal.age = "noage";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("age"), "Invalid value", "Should have a correct message");
        });

        await test("should fail when the property of the object being validated contains numbers and letters", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("age").useValidationRule(strval.containsOnlyNumbers());
            testVal.age = "25years";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("age"), "Invalid value", "Should have a correct message");
        });

        await test("should fail when the property of the object being validated is an empty string", () =>
        {
            // TODO: fix this functions it fails for this case
            validator = new Validator<TestVal>();
            validator.prop("age").useValidationRule(strval.containsOnlyNumbers());
            testVal.age = "";
            // JavaScript interprets an empty string as a 0, which then fails the isNAN test. As well as isFinite test.
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("age"), "Invalid value", "Should have a correct message");
        });

        await test("should fail when the property of the object being validated is null", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("age").useValidationRule(strval.containsOnlyNumbers());
            testVal.age = null as any;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Shoul be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("age"), "Invalid value", "Should have a correct message");
        });
    });


    await describe("isPhoneNumber", async () =>
    {
        await test("should pass when the property of the object being validated is a valid phone number", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("phone").useValidationRule(strval.isPhoneNumber());
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        await test("should fail when the property of the object being validated contains lettets", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("phone").useValidationRule(strval.isPhoneNumber());
            testVal.phone = "1sa4567292";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("phone"), "Invalid value", "Should have a correct message");
        });

        await test("should fail when the property of the object being validated has length less than 10", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("phone").useValidationRule(strval.isPhoneNumber());
            testVal.phone = "1232112";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("phone"), "Invalid value", "Should have a correct message");
        });

        await test("should fail when the property of the object being validated has length greater than 10", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("phone").useValidationRule(strval.isPhoneNumber());
            testVal.phone = "12321231231231212";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("phone"), "Invalid value", "Should have a correct message");
        });


        await test("should fail when the property of the object being validated is an empty string", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("phone").useValidationRule(strval.isPhoneNumber());
            testVal.phone = "";
            // JavaScript interprets an empty string as a 0, which then fails the isNAN test. As well as isFinite test.
            // but here it passes cause of the length check in the rule.
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("phone"), "Invalid value", "Should have a correct message");
        });

        await test("should fail when the property of the object being validated is null", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("phone").useValidationRule(strval.isPhoneNumber());
            testVal.phone = null as any;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Shoul be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("phone"), "Invalid value", "Should have a correct message");
        });
    });


    await describe("isEmail", async () =>
    {
        await test("should pass when the property of the object being validated is a valid email", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("email").useValidationRule(strval.isEmail());
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        await test("should fail when the property of the object being validated is a invalid email", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("email").useValidationRule(strval.isEmail());
            testVal.email = "test.com";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("email"), "Invalid value", "Should have a correct message");
        });

        await test("should fail when the property of the object being validated is a empty string", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("email").useValidationRule(strval.isEmail());
            testVal.email = "";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("email"), "Invalid value", "Should have a correct message");
        });

        await test("should fail when the property of the object being validated is null", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("email").useValidationRule(strval.isEmail());
            testVal.email = null as any;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("email"), "Invalid value", "Should have a correct message");
        });

        await test("should pass when the property of the object being validated is a valid email", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("email").useValidationRule(strval.isEmail());
            testVal.email = "test1.tester@mail.tester.ca";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

    });

    await describe("isDate", async () =>
    {
        await test("should pass when the property of the object being validated is a valid date of format yyyy-MM-dd", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("dob").useValidationRule(strval.isDate("yyyy-MM-dd"));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        await test("should fail when the property of the object being validated is a invalid date for format yyyy-MM-dd", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("dob").useValidationRule(strval.isDate("yyyy-MM-dd"));
            testVal.dob = "1985-16-21";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("dob"), "Invalid date", "Should have a correct message");
        });

        await test("should fail when the property of the object being validated is a empty string", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("dob").useValidationRule(strval.isDate("yyyy-MM-dd"));
            testVal.dob = "";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("dob"), "Invalid date", "Should have a correct message");
        });

        await test("should fail when the property of the object being validated is null", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("dob").useValidationRule(strval.isDate("yyyy-MM-dd"));
            testVal.dob = null as any;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("dob"), "Invalid value", "Should have a correct message");
        });

        await test("should pass when the property of the object being validated does match format yyyy/MM/dd", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("dob").useValidationRule(strval.isDate("yyyy/MM/dd"));
            testVal.dob = "2023/12/31";
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true, "Should be invalid");
        });

        await test("should fail when the property of the object being validated does not match format yyyy/MM/dd", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("dob").useValidationRule(strval.isDate("yyyy/MM/dd"));
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("dob"), "Invalid date", "Should have a correct message");
        });
    });
});