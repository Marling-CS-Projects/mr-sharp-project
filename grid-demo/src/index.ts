import * as p5 from 'p5';

const GRID_DIMENSION = 10;
const CELL_WIDTH_PX = 40;

const EMPTY_CELL = 0;
const FULL_CELL = 1;
const PROBABILITY_OF_FULL = 0.2;

let sketch = function (p: p5) {
    let grid: number[][];
    let playerPos: p5.Vector;

    p.setup = function () {
        p.createCanvas(GRID_DIMENSION * CELL_WIDTH_PX, GRID_DIMENSION * CELL_WIDTH_PX);

        // Build the grid
        grid = [];
        for (let row = 0; row < GRID_DIMENSION; row++) {
            let newRow: number[] = [];

            for (let col = 0; col < GRID_DIMENSION; col++) {
                const cellValue = Math.random() < PROBABILITY_OF_FULL ? FULL_CELL : EMPTY_CELL;
                newRow.push(cellValue);
            }

            grid.push(newRow);
        }

        playerPos = p.createVector(0, 0);
    }

    p.draw = function () {
        p.background('green');

        p.stroke('black');
        p.strokeWeight(2);

        // Draw the grid
        grid.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (cell === FULL_CELL) {
                    p.fill('black')
                } else if (cell === EMPTY_CELL) {
                    p.fill('green')
                } else {
                    // This shouldn't happen....
                    p.fill('yellow')
                }

                p.rect(rowIndex * CELL_WIDTH_PX, cellIndex * CELL_WIDTH_PX, CELL_WIDTH_PX, CELL_WIDTH_PX)
            })
        });

        p.fill('yellow');
        // Draw the player
        p.rect(playerPos.x * CELL_WIDTH_PX, playerPos.y * CELL_WIDTH_PX, CELL_WIDTH_PX, CELL_WIDTH_PX)
    }

    p.keyPressed = function () {
        let targetCell: p5.Vector = playerPos.copy();

        if (p.keyCode === p.DOWN_ARROW) {
            targetCell.y += 1;
        }
        else if (p.keyCode === p.UP_ARROW) {
            targetCell.y -= 1;
        }
        else if (p.keyCode === p.LEFT_ARROW) {
            targetCell.x -= 1;
        }
        else if (p.keyCode === p.RIGHT_ARROW) {
            targetCell.x += 1;
        }

        // Are we allowed to move into this cell?
        const gridAtTarget = grid[targetCell.x][targetCell.y];
        if (gridAtTarget === EMPTY_CELL) {
            playerPos = targetCell
        } else {
            // not allowed (indicate visually?)
        }
    }
}

// create the sketch
new p5(sketch);