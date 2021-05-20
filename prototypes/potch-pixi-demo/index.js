// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
var app = new PIXI.Application();

// The application will create a canvas element for you that you
// can then insert into the DOM.
document.body.appendChild(app.view);

let map = {
    width: 4,
    height: 4,
    tiles: [

    ]
}

const TILE_MUD_TOP_LEFT = 0;
const TILE_MUD_TOP_MIDDLE_1 = 1;
const TILE_MUD_TOP_RIGHT = 2;
const TILE_MUD_TOP_MIDDLE_2 = 3;
const TILE_MUD_TOP_MIDDLE_3 = 4;
const TILE_MUD_TOP_MIDDLE_4 = 5;
const TILE_BRICK_1 = 6;
const TILE_MUD_LEFT = 7;
const TILE_MUD_MIDDLE = 8;
const TILE_MUD_RIGHT = 9;
const TILE_MUD_TOP_MIDDLE_5 = 10;
const TILE_MUD_DOOR = 11;
const TILE_BLACK = 12;
const TILE_BRICK_2 = 13;

// load the texture we need
PIXI.loader.add('tileset', 'images/rotting-pixels/nature-platformer-tileset-16x16.png').load(function (loader, resources) {

    // This creates a texture from a 'bunny.png' image.
    const NATURE_TILESET_COLS = 7;
    const NATURE_TILESET_ROWS = 11;
    const TILESIZE = 16;

    let tileTextures = []
    for (let y = 0; y < NATURE_TILESET_ROWS; y++)
        for (let x = 0; x < NATURE_TILESET_COLS; x++) {
            tileTextures.push(new PIXI.Texture(
                resources.tileset.texture,
                new PIXI.Rectangle(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE)
            ));
        }

    var bunny = new PIXI.Sprite(tileTextures[TILE_MUD_DOOR]);

    // Setup the position of the bunny
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;
    bunny.scale.x = 3;
    bunny.scale.y = 3;

    // Rotate around the center
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    // Add the bunny to the scene we are building.
    app.stage.addChild(bunny);

    // Listen for frame updates
    app.ticker.add(function () {
        // each frame we spin the bunny around a bit
        bunny.rotation += 0.01;
    });
});

app.loader.onError.add((...args) => console.error(args));
