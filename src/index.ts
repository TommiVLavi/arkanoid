import { CanvasView } from "./view/CanvasView";
import { Ball } from "./sprites/ball";
import { Brick } from "./sprites/brick";
import { Paddle } from "./sprites/paddle";
import { Collision } from "./Collision";

//Images
import PADDLE_IMAGE from './images/paddle.png'
import BALL_IMAGE from './images/ball.png'
// Level and colors
import {
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_STARTX,
    BALL_SPEED,
    BALL_SIZE,
    BALL_STARTX,
    BALL_STARTY
} from './setup'

// Helpers
import { createBricks } from './helpers'

let gameOver = false
let score = 0

//Havisit
function setGameOver(view: CanvasView) {
    view.drawInfo('Game Over!')
    gameOver = false
}

//Voitit
function setGameWin(view: CanvasView) {
    view.drawInfo('Victory')
    gameOver = false
}

//Pelaa pelia, eli kaynnistaa kaikkien elementtien piirtamista
function gameLoop(
    view: CanvasView,
    bricks: Brick[],
    paddle: Paddle,
    ball: Ball,
    collision: Collision
) {
    view.clear();
    console.log("Drawing it!")
    view.drawBricks(bricks)
    view.drawSprite(paddle)
    view.drawSprite(ball)

    //Liikuta palkkia antamatta sen menna tormaysrajojen yli
    if (
        (paddle.isMovingLeft && paddle.pos.x > 0) ||
        (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
    ) {
        paddle.movePaddle()
    }

    collision.checkBallCollision(ball, paddle, view)
    const collidingBricks = collision.isCollidingBricks(ball, bricks)
    
    //Saa pisteen, kun tiileen tormaa
    if (collidingBricks) {
        score += 1;
        view.drawScore(score)
    }

    //Liikuta pallo
    ball.moveBall()

    //Kun pallo poistuu alustasta
    if (ball.pos.y > view.canvas.height) gameOver = true

    if(gameOver) return setGameOver(view)

    //Kun kaikki on lyoty pois
    if(bricks.length === 0) return setGameWin(view)


    requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision))
}

function startGame(view: CanvasView) {
    // Kaynnista uudelleen
    score = 0;
    view.drawInfo('');
    view.drawScore(0);
    
    //Luo tormaysrajat
    const coll = new Collision();

    // Tuo tiililistan
    const bricks = createBricks();

    // Luo palkki
    const paddle = new Paddle(
        PADDLE_SPEED,
        PADDLE_WIDTH,
        PADDLE_HEIGHT,
        {
            x: PADDLE_STARTX,
            y: view.canvas.height - PADDLE_HEIGHT - 5
        },
        PADDLE_IMAGE
    )

    // Luo pallo
    const ball = new Ball(
        BALL_SPEED,
        BALL_SIZE,
        { x: BALL_STARTX, y: BALL_STARTY },
        BALL_IMAGE  
    )

    gameLoop(view, bricks, paddle, ball, coll)
}

//Luodaan uusi nakyma
const view = new CanvasView('#playField')

//Peli alkaa 'start'-nappia painalleessa
view.initStartButton(startGame)