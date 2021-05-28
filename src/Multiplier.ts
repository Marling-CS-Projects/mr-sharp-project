class Multiplier {
    operand: number;

    constructor(operand: number) {
        this.operand = operand;
    }

    multiply(a: number) {
        return this.operand * a;
    }
}

// If I export using 'default', then I can import the class as shown in the test file
export default Multiplier;