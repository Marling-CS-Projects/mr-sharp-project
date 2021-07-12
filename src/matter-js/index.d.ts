import * as Matter from 'matter-js';

declare module "matter-js" {
  /**
   * https://brm.io/matter-js/docs/classes/Detector.html
   */
  interface Detector {
    canCollide(filterA: Matter.ICollisionFilter, filterB: Matter.ICollisionFilter): boolean;
    collisions(broadcastPair: Matter.IPair, engine: Matter.Engine): [];
  }

  /**
   * https://brm.io/matter-js/docs/classes/SAT.html
   */
  interface SAT {
    collides<T>(bodyA: Matter.Body, bodyB: Matter.Body, previousCollision: Matter.IEventCollision<T>): Matter.IEventCollision<T>;
  }
}
