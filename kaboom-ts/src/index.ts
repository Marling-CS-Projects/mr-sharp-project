import kaboom from 'kaboom';
import { Engine } from 'matter-js';

import rocketCarControlsProducer from './components/rocketCarControls';
import scoreProducer, { ScoreContainer } from './components/score';
import { matterRectBodyProducer, matterCircleBodyProducer } from './components/matterBody';

// Create our Kaboom context
const k = kaboom({

});

// Create our Matter JS engine
let engine = Engine.create();

// Create our component producers, with reference to this single context
const score = scoreProducer(k);
const rocketCarControls = rocketCarControlsProducer(k);
const matterRectBody = matterRectBodyProducer(k, engine);
const matterCircleBody = matterCircleBodyProducer(k, engine);

// Pull what we require from the Kaboom context in this source file.
const {
    scene,
    pos,
    add,
    keyPress,
    text,
    origin,
    outline,
    dt
} = k;

// The player score is tracked outside of any specific scene
let playerScore = new ScoreContainer();

scene("game", () => {
    playerScore.reset();

    // add character to screen, from a list of components
    add([
        rect(64, 48),
        color(180, 20, 0),
        rotate(0),
        pos(120, 80),
        origin('center'),
        matterRectBody(),
        outline(4),
        rocketCarControls()
    ]);

    // Show the score
    add([score(playerScore)])

    // add platform
    add([
        circle(48),
        color(50, 20, 200),
        rotate(0),
        origin('center'),
        pos(80, height() / 2),
        outline(4),
        matterCircleBody({
            isStatic: true
        })
    ]);

    add([
        rect(width(), 48),
        color(50, 20, 200),
        rotate(0),
        origin('center'),
        pos(width() / 2, height() - 48),
        outline(4),
        matterRectBody({
            isStatic: true
        })
    ]);

    // increment score every frame
    action(() => {
        playerScore.incrementScore();
        Engine.update(engine, 1000 * dt());
    });
})

scene("lose", () => {
    add([
        text("Game Over"),
        pos(center()),
        origin("center"),
    ]);

    // Show the score
    add([score(playerScore)])

    // go back to game with space is pressed
    keyPress("space", () => go("game"));
    mouseClick(() => go("game"));
})

go("game")

