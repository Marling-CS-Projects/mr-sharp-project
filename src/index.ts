import * as p5 from 'p5';

import { Engine, World, Bodies, Body } from 'matter-js';

import Player from './Player';
import Obstacle from './Obstacle';

const LEVEL_WIDTH = 10000;

let sketch = function (p: p5) {
    // create an engine
    let engine: Matter.Engine;
    var ground: Matter.Body;
    let player: Player;
    let obstacles: Obstacle[];

    p.setup = function () {
        p.createCanvas(700, 410);

        engine = Engine.create();
        ground = Bodies.rectangle(400, 410, LEVEL_WIDTH, 60, { isStatic: true });

        player = new Player(p, engine);
        obstacles = [];
        for (let i = 0; i < 50; i++) {
            let position = p.createVector(p.random(0, LEVEL_WIDTH), p.height * 0.8);
            obstacles.push(new Obstacle(p, engine, position));
        }

        World.add(engine.world, [ground]);
    };

    p.draw = function () {
        Engine.update(engine, p.deltaTime);

        p.background(0);

        p.push();
        p.translate(-player.body.position.x + p.width / 2, 0);

        // Handle updates of game objects
        player.update();
        obstacles.forEach(o => o.update());

        // Handle drawing of game objects
        player.draw();
        obstacles.forEach(o => o.draw());

        // Draw ground
        p.fill('brown');

        p.beginShape()
        ground.vertices.forEach(vertex => {
            p.vertex(vertex.x, vertex.y);
        })
        p.endShape(p.CLOSE);

        p.pop();
    };
};

let myp5 = new p5(sketch);