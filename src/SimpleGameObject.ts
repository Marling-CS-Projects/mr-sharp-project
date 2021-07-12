import * as p5 from "p5";
import { World, Body, Engine } from 'matter-js'
import GameObject from "./GameObject";

abstract class SimpleGameObject extends GameObject {
    body: Body;
    colour: string;

    constructor(s: p5,
        engine: Engine,
        body: Body,
        colour: string) {
        super(s);
        this.body = body;
        this.colour = colour;

        World.add(engine.world, [this.body]);
    }
    abstract update(): void;
    draw(): void {
        this.s.fill(this.colour);

        this.s.beginShape()
        this.body.vertices.forEach(vertex => {
            this.s.vertex(vertex.x, vertex.y);
        })
        this.s.endShape(this.s.CLOSE);
    }
}

export default SimpleGameObject;