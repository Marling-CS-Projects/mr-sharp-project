import type { KaboomCtx, Comp, GameObj, RectComp, PosComp, RotateComp } from 'kaboom';
import type { Engine, Body, IChamferableBodyDefinition } from 'matter-js'
import { Bodies, Composite } from 'matter-js'

export interface MatterBodyComp extends Comp {
    body?: Body;
}

type MatterBodyGameObj = GameObj<MatterBodyComp | RotateComp | PosComp | RectComp>;

const toRadians = (degrees: number) => degrees * 180 / Math.PI;

export const matterRectBodyProducer = (k: KaboomCtx, engine: Engine) => {

    return (opts: IChamferableBodyDefinition = {}): MatterBodyComp => {
        return {
            id: 'matterRectBody',
            req: ['rect', 'pos', 'rotate'],
            add(this: MatterBodyGameObj) {
                // Use the details from the rectangle to create our body
                this.body = Bodies.rectangle(this.pos.x, this.pos.y, this.width, this.height, opts);

                Composite.add(engine.world, [this.body]);
            },
            update(this: MatterBodyGameObj) {
                this.pos.x = this.body.position.x;
                this.pos.y = this.body.position.y;
                this.angle = toRadians(this.body.angle);
            }
        } as MatterBodyComp;
    }
}

export const matterCircleBodyProducer = (k: KaboomCtx, engine: Engine) => {

    return (opts: IChamferableBodyDefinition = {}): MatterBodyComp => {
        return {
            id: 'matterCircleBody',
            req: ['circle', 'pos', 'rotate'],
            add(this: MatterBodyGameObj) {
                // Use the details from the rectangle to create our body
                this.body = Bodies.circle(this.pos.x, this.pos.y, this.radius, opts);

                Composite.add(engine.world, [this.body]);
            },
            update(this: MatterBodyGameObj) {
                this.pos.x = this.body.position.x;
                this.pos.y = this.body.position.y;
                this.angle = toRadians(this.body.angle);
            }
        } as MatterBodyComp;
    }
}
