import { Engine } from "matter-js";
import * as p5 from "p5";
import GameObject from "./GameObject";
import Obstacle from "./Obstacle";

class Level extends GameObject {
    platforms: Obstacle[];

    constructor(s: p5, engine: Engine) {
        super(s);

        this.platforms = [];
        for (let i = 0; i < 5; i++) {
            this.platforms.push(new Obstacle(s, engine));
        }

    }

    update(): void {
        this.platforms.forEach(p => p.update());
    }
    draw(): void {
        this.platforms.forEach(p => p.draw());
    }
}

export default Level;