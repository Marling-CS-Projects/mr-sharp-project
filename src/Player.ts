import * as p5 from 'p5';
import { Bodies, Engine, Body, Vector } from 'matter-js';
import SimpleGameObject from './SimpleGameObject';

const MAX_VELOCITY: Vector = {
    x: 1,
    y: 5
}

const clipValue = (value: number, maxAbs: number): number => Math.abs(value) > maxAbs ?
    maxAbs * value / Math.abs(value) :
    value;

class Player extends SimpleGameObject {
    body: Body;

    constructor(s: p5, engine: Engine) {
        super(s, engine, Bodies.rectangle(s.width / 2, s.height / 2, 20, 20), 'blue');
    }

    update() {
        if (this.s.keyIsDown(this.s.UP_ARROW)) {
            Body.applyForce(this.body, this.body.position, { x: 0, y: -0.001 });
        }
        if (this.s.keyIsDown(this.s.LEFT_ARROW)) {
            Body.applyForce(this.body, this.body.position, { x: -0.001, y: 0 });
        }
        if (this.s.keyIsDown(this.s.RIGHT_ARROW)) {
            Body.applyForce(this.body, this.body.position, { x: +0.001, y: 0 });
        }

        // Trim the velocity to a maximum value
        Body.setVelocity(this.body, {
            x: clipValue(this.body.velocity.x, MAX_VELOCITY.x),
            y: clipValue(this.body.velocity.y, MAX_VELOCITY.y),
        });
    }
}

export default Player;