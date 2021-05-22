import * as p5 from 'p5';

import { Body, Bodies, Engine, World } from 'matter-js';
import GameObject from './GameObject';

class Obstacle extends GameObject {
    body: Body;

    constructor(s: p5, engine: Engine, position: p5.Vector) {
        super(s);
        this.s = s;

        this.body = Bodies.rectangle(position.x, position.y, 50, 50);

        World.add(engine.world, [this.body]);
    }

    update() {

    }

    draw() {
        this.s.fill('green');

        this.s.beginShape()
        this.body.vertices.forEach(vertex => {
            this.s.vertex(vertex.x, vertex.y);
        })
        this.s.endShape(this.s.CLOSE);
    }
}

export default Obstacle;