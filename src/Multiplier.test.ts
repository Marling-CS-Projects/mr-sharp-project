import Multiplier from "./Multiplier";

describe('Multiplier', () => {
    test('Multiply by 5', () => {
        let multiplier = new Multiplier(5);

        let ans1 = multiplier.multiply(6);
        expect(ans1).toBe(30);

        let ans2 = multiplier.multiply(7);
        expect(ans2).toBe(35);
    });

    test('Testing Collisions', () => {
        let player = new Multiplier(3);

        let multA = new Multiplier(3);
        let multB = new Multiplier(4);
        let multC = new Multiplier(3);

        expect(multA.isTheSame(multB)).toBeFalsy();
        expect(multA.isTheSame(multC)).toBeTruthy();

        let multipliers = [multA, multB, multC];
        
        multipliers.forEach(m => {
            if (player.isTheSame(m)) {
                // do whatever I need to do when player collides with multipler
            }
        })
    })
});