import * as p5 from 'p5';

import { Engine, World, Bodies, Events, IEventCollision } from 'matter-js';

import Player from './Player';
import Level from './Level';
import * as Matter from 'matter-js';

const LEVEL_WIDTH = 10000;

let sketch = function (p: p5) {
    // create an engine
    let engine: Matter.Engine;
    var ground: Matter.Body;
    let player: Player;
    let level: Level;

    // Demo of array of bodies
    let skyDecorations: Matter.Body[];

    p.setup = function () {
        p.createCanvas(700, 410);

        engine = Engine.create();
        ground = Bodies.rectangle(400, 410, LEVEL_WIDTH, 60, { isStatic: true });

        player = new Player(p, engine);
        level = new Level(p, engine);

        World.add(engine.world, [ground]);

        skyDecorations = []
        skyDecorations.push(Bodies.rectangle(40, 40, 50, 60, { isStatic: true }))
        skyDecorations.push(Bodies.rectangle(150, 50, 50, 60, { isStatic: true }))
        skyDecorations.push(Bodies.rectangle(250, 30, 50, 60, { isStatic: true }))
        skyDecorations.push(Bodies.rectangle(350, 25, 50, 60, { isStatic: true }))

        // Setup some collision detection
        Events.on(engine, 'collisionStart', (event: IEventCollision<Engine>) => {
            event.pairs
                .filter(pair => pair.bodyA.id == player.body.id || pair.bodyB.id == player.body.id)
                .forEach(pair => {
                    let otherBody = pair.bodyA.id == player.body.id ? pair.bodyB : pair.bodyA;
                    level.platforms.forEach(platform => {
                        if (platform.body.id === otherBody.id) {
                            platform.onContactWithPlayerStarts();
                        }
                    })
                })
        })

        // Setup some collision detection
        Events.on(engine, 'collisionEnd', (event: IEventCollision<Engine>) => {
            event.pairs
                .filter(pair => pair.bodyA.id == player.body.id || pair.bodyB.id == player.body.id)
                .forEach(pair => {
                    let otherBody = pair.bodyA.id == player.body.id ? pair.bodyB : pair.bodyA;
                    level.platforms.forEach(platform => {
                        if (platform.body.id === otherBody.id) {
                            platform.onContactWithPlayerEnds();
                        }
                    })
                })
        })
    };

    p.draw = function () {
        Engine.update(engine, p.deltaTime);

        p.background(0);

        p.push();
        p.translate(-player.body.position.x + p.width / 2, 0);

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

        // Draw sky decorations in array
        p.fill("yellow")
        skyDecorations.forEach(skyDecoration => {
            p.beginShape()

            skyDecoration.vertices.forEach(v => {
                p.vertex(v.x, v.y)
            })

            p.endShape(p.CLOSE)
        })

        p.pop();
    };
};

let myp5 = new p5(sketch);