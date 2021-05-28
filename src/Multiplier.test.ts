import Multiplier from "./Multiplier";

describe('Multiplier', () => {
    test('Multiply by 5', () => {
        let multiplier = new Multiplier(5);

        let ans1 = multiplier.multiply(6);
        expect(ans1).toBe(30);

        let ans2 = multiplier.multiply(7);
        expect(ans2).toBe(35);
    });
});