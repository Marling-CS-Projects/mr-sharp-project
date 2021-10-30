import kaboom from 'kaboom';

const { addKaboom, origin } = kaboom();

// keep track of score
let score = 0;

scene("game", () => {
    // load a default sprite
    loadBean();

    // add character to screen, from a list of components
    const player = add([
        // sprite("bean"),  // renders as a sprite
        rect(48, 48),
        color(255, 0, 0),
        pos(120, 80),    // position in world
        area(),          // has a collider
        body(),          // responds to physics and gravity
    ]);

    // jump when player presses "space" key
    keyPress("space", () => {
        // .jump() is provided by the body() component
        if (player.grounded()) {
            player.jump();
        }
    });

    // add platform
    add([
        rect(width(), 48),
        pos(0, height() - 48),
        outline(4),
        area(),
        solid(),
        color(127, 200, 255),
    ])

    // add tree
    loop(1, () => {
        // add tree
        add([
            rect(48, rand(24, 64)),
            area(),
            outline(4),
            pos(width(), height() - 48),
            origin("botleft"),
            color(255, 180, 255),
            move(LEFT, 240),
            "tree", // add a tag here
        ]);
    });

    player.collides("tree", () => {
        addKaboom(player.pos);
        shake(4);
        go("lose");
    });


    const scoreLabel = add([
        text(score.toString(10)),
        pos(24, 24),
    ]);

    // increment score every frame
    action(() => {
        score++;
        scoreLabel.text = score.toString(10);
    });
})

scene("lose", () => {
    add([
        text("Game Over"),
        pos(center()),
        origin("center"),
    ]);

    // display score
    add([
        text(score.toString(10)),
        pos(width() / 2, height() / 2 + 80),
        scale(2),
        origin("center"),
    ]);

    // go back to game with space is pressed
    keyPress("space", () => go("game"));
    mouseClick(() => go("game"));
})

go("game")

