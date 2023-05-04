import { Brick } from "./sprites/brick";
import { Paddle } from "./sprites/paddle";
import { Ball } from "./sprites/ball";
import { CanvasView } from "./view/CanvasView";
import { BRICK_IMAGES } from "./setup";

export class Collision {
    //Antaa True:n, kun pallo tormasi tiileen
    isColldingBrick(ball: Ball, brick: Brick): boolean {
        if (
            ball.pos.x < brick.pos.x + brick.width &&
            ball.pos.x + ball.width > brick.pos.x &&
            ball.pos.y < brick.pos.y + brick.height &&
            ball.pos.y + ball.height > brick.pos.y
        ) {
            return true;
        } else {
            return false;
        }
    }

    //Tarkistaa koko ajan, etta onko pallo tormannyt tiileen
    isCollidingBricks(ball: Ball, bricks: Brick[]): boolean {
        let coll = false;

        bricks.forEach((brick, i) => {
            if(this.isColldingBrick(ball, brick)){
                ball.changeYDirection();

                if(brick.energy === 1){
                    bricks.splice(i,1);
                } else {
                    brick.energy -= 1;
                }
                coll = true
            }
        })
        return coll
    }

    //Samoin tarkistaa koko ajan, onko pallo tormannyt palkkiin tai
    //johonkin seinaan
    checkBallCollision(ball: Ball, paddle: Paddle, view: CanvasView): void {
        //Tormays palkkiin
        if(
            ball.pos.x + ball.width > paddle.pos.x &&
            ball.pos.x < paddle.pos.x + paddle.width &&
            ball.pos.y + ball.height === paddle.pos.y
        ) {
            ball.changeYDirection()
        }

        //Tormays seiniin
        if (
            ball.pos.x > view.canvas.width - ball.width || ball.pos.x < 0
        ) {
            ball.changeXDirection()
        }

        //Tormays takaseinaan
        if (ball.pos.y <= 0) {
            ball.changeYDirection()
        }
    }
}