import * as p5 from 'p5';

import { Engine, World, Bodies, Body } from 'matter-js';

let sketch = function (p: p5) {
    // create an engine
    let engine: Matter.Engine;
    var boxA: Matter.Body;
    var boxB: Matter.Body;
    var ground: Matter.Body;

    p.setup = function () {
        p.createCanvas(700, 410);

        engine = Engine.create();
        // create two boxes and a ground
        boxA = Bodies.rectangle(400, 200, 80, 80);
        boxB = Bodies.rectangle(450, 50, 80, 80);
        ground = Bodies.rectangle(400, 410, 810, 60, { isStatic: true });

        World.add(engine.world, [boxA, boxB, ground]);
    };

    p.draw = function () {
        Engine.update(engine, p.deltaTime);

        p.background(0);
        p.fill(255);

        // Draw all bodies
        // p5 and matter js meeting
        engine.world.bodies.forEach(body => {
            p.beginShape()
            body.vertices.forEach(vertex => {
                p.vertex(vertex.x, vertex.y);
            })
            p.endShape(p.CLOSE);
        });


        if (p.keyIsDown(p.UP_ARROW)) {
            Body.applyForce(boxA, boxA.position, { x: 0, y: -0.01 });
        }
        if (p.keyIsDown(p.LEFT_ARROW)) {
            Body.applyForce(boxA, boxA.position, { x: -0.01, y: 0 });
        }
        if (p.keyIsDown(p.RIGHT_ARROW)) {
            Body.applyForce(boxA, boxA.position, { x: +0.01, y: 0 });
        }
    };
};

let myp5 = new p5(sketch);