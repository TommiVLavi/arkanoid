import { Brick } from '../sprites/brick'
import { Paddle } from '../sprites/paddle'
import { Ball } from '../sprites/ball'

//Kyseessa on luokka, joka piirtaa kaikki naytolla nakyvat elementit

export class CanvasView {
     canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;
    private scoreDisplay: HTMLObjectElement | null;
    private start: HTMLObjectElement | null;
    private info: HTMLObjectElement | null;

    constructor(canvasName: string) {
        this.canvas = document.querySelector(canvasName) as HTMLCanvasElement
        this.context = this.canvas.getContext('2d')
        this.scoreDisplay = document.querySelector('#score')
        this.start = document.querySelector('#start')
        this.info = document.querySelector('#info')
    }

    clear(): void {
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    initStartButton(startFunction: (view: CanvasView) => void): void {
        this.start?.addEventListener('click', () => startFunction(this))
    }

    drawScore(score: number): void {
        if (this.scoreDisplay) this.scoreDisplay.innerHTML = score.toString();
    }

    drawInfo(info: string): void {
        if (this.info) this.info.innerHTML = info;
    }

    //Piirtaa kaikki objektit Canvas-alustalle
    drawSprite(object: Brick | Paddle | Ball): void {
        if (!object) return;

        this.context?.drawImage(
            object.image,
            object.pos.x,
            object.pos.y,
            object.width,
            object.height
        )
    }

    drawBricks(bricks: Brick[]): void {
        bricks.forEach(brick => this.drawSprite(brick))  
    };
}
