import assert from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { Validator } from "../src/index.js";

await describe("Number validation", async () =>
{
    interface TestVal
    {
        firstName: string;
        lastName: string;
        age: number;
        scores?: Array<any>;
        address?: any;
        phone: string;
        email: string;
    }

    let testVal: TestVal;
    let validator: Validator<TestVal>;

    beforeEach(() =>
    {
        testVal = {
            firstName: "John",
            lastName: "doh",
            age: 31,
            scores: [200, 400, 800],
            phone: "1112223456",
            email: "test@test.com"
        };
    });

    await describe("hasMinValue", async () =>
    {
        await test("should pass when the property of the object being validated has value greater than 18", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("age").hasMinValue(18);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        await test("should fail when the property of the object being validated has value less than 18", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("age").hasMinValue(18);
            testVal.age = 16;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be true");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("age"), "Value cannot be less than 18", "Should have a correct message");
        });
        await test("should pass when the property of the object being validated has value equal to 18", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("age").hasMinValue(18);
            testVal.age = 18;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true, "Should be true");
        });
    });


    await describe("hasMaxValue", async () =>
    {
        await test("should pass when the property of the object being validated has value is less than 18", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("age").hasMaxValue(18);
            testVal.age = 16;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        await test("should fail when the property of the object being validated has value is greater than 18", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("age").hasMaxValue(18);
            testVal.age = 26;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be true");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("age"), "Value cannot be greater than 18", "Should have a correct message");
        });
        await test("should pass when the property of the object being validated has value equal to 18", () =>
        {
            validator = new Validator<TestVal>();
            validator.prop("age").hasMaxValue(18);
            testVal.age = 18;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true, "Should be true");
        });
    });


    await describe("isIn", async () =>
    {
        await test("should pass when the property of the object being validated is in the given set", () =>
        {
            validator = new Validator<TestVal>();
            const set: Array<number> = [12, 323, 18, 25, 31];
            validator.prop("age").isInNumbers(set);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        await test("should fail when the property of the object being validated is not in the given set", () =>
        {
            validator = new Validator<TestVal>();
            const set: Array<number> = [1, 2, 3, 4];
            validator.prop("age").isInNumbers(set);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("age"), "Invalid value", "Should have a correct message");
        });

        await test("should fail when the given set empty", () =>
        {
            validator = new Validator<TestVal>();
            const set: Array<number> = [];
            validator.prop("age").isInNumbers(set);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("age"), "Invalid value", "Should have a correct message");
        });
    });


    await describe("isNotIn", async () =>
    {
        await test("should pass when the property of the object being validated is not in the given set", () =>
        {
            validator = new Validator<TestVal>();
            const set: Array<number> = [12, 323, 18, 25];
            validator.prop("age").isNotInNumbers(set);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        await test("should fail when the property of the object being validated is in the given set", () =>
        {
            validator = new Validator<TestVal>();
            const set: Array<number> = [1, 2, 3, 4, 31];
            validator.prop("age").isNotInNumbers(set);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("age"), "Invalid value", "Should have a correct message");
        });

        await test("should pass when the given set empty", () =>
        {
            validator = new Validator<TestVal>();
            const set: Array<number> = [];
            validator.prop("age").isNotInNumbers(set);
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, true);
        });

        await test("should fail when the property of the object being validated is null and is in the given set", () =>
        {
            validator = new Validator<TestVal>();
            const set: Array<number> = [1, 2, 3, null as any];
            validator.prop("age").isNotInNumbers(set);
            testVal.age = null as any;
            validator.validate(testVal);
            assert.strictEqual(validator.isValid, false, "Should be invalid");
            assert.strictEqual(validator.hasErrors, true, "Should have error");
            assert.strictEqual(validator.errors.getValue("age"), "Invalid value", "Should have a correct message");
        });
    });
});