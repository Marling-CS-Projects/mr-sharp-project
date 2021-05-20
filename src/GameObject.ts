import * as p5 from "p5";

abstract class GameObject {
    s: p5;

    constructor (s: p5) {
        this.s = s;
    }
    abstract update(): void;
    abstract draw(): void;
}

export default GameObject;