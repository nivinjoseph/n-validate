import "@nivinjoseph/n-ext";
import assert from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { CollectionValidationRule, Validator, strval } from "../src/index.js";

await describe("Collection validation", async () =>
{
    interface Item
    {
        name: string;
        score: number;
    }

    interface Cart
    {
        items: Array<Item> | null;
    }

    let itemValidator: Validator<Item>;
    let cartValidator: Validator<Cart>;

    beforeEach(() =>
    {
        itemValidator = new Validator<Item>();
        itemValidator.prop("name").isRequired().useValidationRule(strval.hasMinLength(2));
        itemValidator.prop("score").isRequired().ensure(t => t >= 0);

        cartValidator = new Validator<Cart>();
        cartValidator.prop("items").useCollectionValidator(itemValidator);
    });


    await describe("CollectionValidationRule directly", async () =>
    {
        await test("should pass for a collection of all valid items", () =>
        {
            const rule = new CollectionValidationRule(itemValidator);
            const result = rule.validate([
                { name: "apple", score: 5 },
                { name: "pear", score: 3 }
            ]);
            assert.strictEqual(result, true);
            assert.deepStrictEqual(rule.error, [null, null]);
        });

        await test("should fail for a collection with one invalid item and report error at the right index", () =>
        {
            const rule = new CollectionValidationRule(itemValidator);
            const result = rule.validate([
                { name: "apple", score: 5 },
                { name: "x", score: 3 },
                { name: "pear", score: 2 }
            ]);
            assert.strictEqual(result, false);
            assert.strictEqual(rule.error.length, 3);
            assert.strictEqual(rule.error[0], null);
            assert.notStrictEqual(rule.error[1], null);
            assert.strictEqual(rule.error[2], null);
        });

        await test("should preserve distinct errors for multiple invalid items (no reference aliasing)", () =>
        {
            const rule = new CollectionValidationRule(itemValidator);
            rule.validate([
                { name: "x", score: 5 },
                { name: "ok", score: -1 }
            ]);
            const firstError = rule.error[0] as any;
            const secondError = rule.error[1] as any;
            assert.notStrictEqual(firstError, null, "first should have error");
            assert.notStrictEqual(secondError, null, "second should have error");
            assert.strictEqual(firstError.name, "Min length of 2 required");
            assert.strictEqual(firstError.score, null);
            assert.strictEqual(secondError.name, null);
            assert.notStrictEqual(secondError.score, null);
        });

        await test("should pass for a null collection (null-permissive policy)", () =>
        {
            const rule = new CollectionValidationRule(itemValidator);
            const result = rule.validate(null as any);
            assert.strictEqual(result, true);
            assert.deepStrictEqual(rule.error, []);
        });

        await test("should pass for an empty collection", () =>
        {
            const rule = new CollectionValidationRule(itemValidator);
            const result = rule.validate([]);
            assert.strictEqual(result, true);
            assert.deepStrictEqual(rule.error, []);
        });

        await test("should treat null items as valid and record null at their index", () =>
        {
            const rule = new CollectionValidationRule(itemValidator);
            const result = rule.validate([
                { name: "apple", score: 5 },
                null as any,
                { name: "pear", score: 2 }
            ]);
            assert.strictEqual(result, true);
            assert.deepStrictEqual(rule.error, [null, null, null]);
        });

        await test("should throw ArgumentNullException when constructed without a validator", () =>
        {
            assert.throws(() => new CollectionValidationRule(null as any));
        });
    });


    await describe("useCollectionValidator through Validator", async () =>
    {
        await test("should pass when all items are valid", () =>
        {
            const cart: Cart = {
                items: [
                    { name: "apple", score: 5 },
                    { name: "pear", score: 3 }
                ]
            };
            cartValidator.validate(cart);
            assert.strictEqual(cartValidator.isValid, true);
            assert.strictEqual(cartValidator.hasErrors, false);
        });

        await test("should fail when any item is invalid", () =>
        {
            const cart: Cart = {
                items: [
                    { name: "apple", score: 5 },
                    { name: "x", score: 3 }
                ]
            };
            cartValidator.validate(cart);
            assert.strictEqual(cartValidator.isValid, false);
            assert.strictEqual(cartValidator.hasErrors, true);
        });

        await test("should pass when collection is null (null-permissive)", () =>
        {
            const cart: Cart = { items: null };
            cartValidator.validate(cart);
            assert.strictEqual(cartValidator.isValid, true);
        });

        await test("should pass when collection is empty", () =>
        {
            const cart: Cart = { items: [] };
            cartValidator.validate(cart);
            assert.strictEqual(cartValidator.isValid, true);
        });

        await test("should propagate per-item errors to validator.errors", () =>
        {
            const cart: Cart = {
                items: [
                    { name: "apple", score: 5 },
                    { name: "x", score: -1 }
                ]
            };
            cartValidator.validate(cart);
            const itemsErrors = cartValidator.errors["items"] as Array<any>;
            assert.ok(Array.isArray(itemsErrors));
            assert.strictEqual(itemsErrors.length, 2);
            assert.strictEqual(itemsErrors[0], null);
            assert.notStrictEqual(itemsErrors[1], null);
        });
    });


    await describe("nested collections (two levels)", async () =>
    {
        interface Line
        {
            product: string;
            qty: number;
        }

        interface Order
        {
            lines: Array<Line>;
        }

        interface Invoice
        {
            orders: Array<Order>;
        }

        await test("should validate nested collections without cross-contamination of errors", () =>
        {
            const lineValidator = new Validator<Line>();
            lineValidator.prop("product").isRequired().useValidationRule(strval.hasMinLength(1));
            lineValidator.prop("qty").isRequired().ensure(t => t > 0);

            const orderValidator = new Validator<Order>();
            orderValidator.prop("lines").useCollectionValidator(lineValidator);

            const invoiceValidator = new Validator<Invoice>();
            invoiceValidator.prop("orders").useCollectionValidator(orderValidator);

            const invoice: Invoice = {
                orders: [
                    { lines: [{ product: "a", qty: 1 }] },
                    { lines: [{ product: "b", qty: -1 }] }
                ]
            };

            invoiceValidator.validate(invoice);
            assert.strictEqual(invoiceValidator.isValid, false);
            const ordersErrors = invoiceValidator.errors["orders"] as Array<any>;
            assert.strictEqual(ordersErrors.length, 2);
            assert.strictEqual(ordersErrors[0], null, "first order should be valid");
            assert.notStrictEqual(ordersErrors[1], null, "second order should have errors");
        });

        await test("should retain independent snapshots for items after re-validation", () =>
        {
            const lineValidator = new Validator<Line>();
            lineValidator.prop("qty").isRequired().ensure(t => t > 0);

            const rule = new CollectionValidationRule(lineValidator);

            rule.validate([{ product: "a", qty: -1 }]);
            const firstSnapshot = rule.error[0];

            rule.validate([{ product: "b", qty: 5 }]);
            const secondSnapshot = rule.error[0];

            assert.notStrictEqual(firstSnapshot, null, "first run should have recorded an error");
            assert.strictEqual(secondSnapshot, null, "second run should be valid");
            assert.notStrictEqual(firstSnapshot, secondSnapshot, "snapshots must be independent");
        });
    });
});
