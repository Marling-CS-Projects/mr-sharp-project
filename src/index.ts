import * as p5 from 'p5';

import { Engine, World, Bodies, Body } from 'matter-js';

import Player from './Player';
import Obstacle from './Obstacle';
import Level from './Level';

let sketch = function (p: p5) {
    // create an engine
    let engine: Matter.Engine;
    var ground: Matter.Body;
    let player: Player;
    let level: Level;

    p.setup = function () {
        p.createCanvas(700, 410);

        engine = Engine.create();
        ground = Bodies.rectangle(400, 410, 810, 60, { isStatic: true });

        player = new Player(p, engine);
        level = new Level(p, engine);

        World.add(engine.world, [ground]);
    };

    p.draw = function () {
        Engine.update(engine, p.deltaTime);

        p.background(0);

        // Handle updates of game objects
        player.update();
        level.update();

        // Handle drawing of game objects
        player.draw();
        level.draw();

        // Draw ground
        p.fill('brown');

        p.beginShape()
        ground.vertices.forEach(vertex => {
            p.vertex(vertex.x, vertex.y);
        })
        p.endShape(p.CLOSE);
    };
};

let myp5 = new p5(sketch);