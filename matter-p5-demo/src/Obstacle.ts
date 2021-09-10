import * as p5 from 'p5';

import { Bodies, Engine } from 'matter-js';
import SimpleGameObject from './SimpleGameObject';

class Obstacle extends SimpleGameObject {
    inContactWithPlayer: boolean;

    constructor(s: p5, engine: Engine, position: p5.Vector) {
        super(s, engine, Bodies.rectangle(position.x, position.y, 50, 50), 'green');

        this.inContactWithPlayer = false;
    }

    onContactWithPlayerStarts() {
        this.inContactWithPlayer = true;
    }
    onContactWithPlayerEnds() {
        this.inContactWithPlayer = false;
    }

    update() {
        this.colour = this.inContactWithPlayer ? 'lime' : 'green';
    }
}

export default Obstacle;