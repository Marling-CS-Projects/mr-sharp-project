import type { KaboomCtx, GameObj, Comp, TextComp, PosComp } from 'kaboom';

export interface ScoreComp {
    score: number;
    reset: () => void;
    incrementScore: (amount?: number) => void;
}

export class ScoreContainer implements ScoreComp {
    score: number;

    constructor() {
        this.score = 0;
    }

    reset() {
        this.score = 0;
    }

    incrementScore(amount: number = 1) {
        this.score += amount;
    }
}

const scoreProducer = ({ add, text, pos }: KaboomCtx) => {

    return (scoreContainer: ScoreContainer): Comp => {
        let scoreLabel: GameObj & TextComp & PosComp;

        return {
            id: 'score',
            add() {
                scoreLabel = add([
                    text(scoreContainer.score.toString(10)),
                    pos(24, 24),
                ]) as GameObj & TextComp & PosComp;
            },
            update() {
                scoreLabel.text = scoreContainer.score.toString(10);
            }
        }
    }
}

export default scoreProducer;