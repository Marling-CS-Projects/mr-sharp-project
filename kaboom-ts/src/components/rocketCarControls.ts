import type { KaboomCtx, Comp, Vec2, BodyComp } from 'kaboom';
import { MatterBodyComp } from './matterBody';


const rocketCarControls = ({ vec2, keyIsDown, keyPress }: KaboomCtx) => {
    const ACCELERATION_MAGNITUDE = 0.3;
    const MOVE_RIGHT: Vec2 = vec2(ACCELERATION_MAGNITUDE, 0);
    const MOVE_LEFT: Vec2 = MOVE_RIGHT.scale(-1);

    return (): Comp => {

        return {
            id: 'rocketCar',
            require: ['matterRectBody'],
            add(this: BodyComp) {
                // jump when player presses "space" key
                // keyPress("space", () => {
                //     // .jump() is provided by the body() component
                //     if (this.grounded()) {
                //         this.jump();
                //     }
                // });
            },
            update(this: MatterBodyComp) {
                if (keyIsDown('left')) {
                    // this.ap(MOVE_LEFT);
                }

                if (keyIsDown('right')) {
                    // this.applyForce(MOVE_RIGHT);
                }
            }
        }
    }
}

export default rocketCarControls;