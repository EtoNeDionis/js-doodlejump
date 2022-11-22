import { Game } from './Game';
import imgEnemy from "../public/enemy.svg"
export class Enemy {
    game: Game;
    sizeIndex: number;
    width: number;
    height: number;
    x: number;
    y: number;
    vx: number;
    isDeleted: boolean;
    image: CanvasImageSource;

    constructor(game: Game) {
        this.game = game
        this.sizeIndex = .35
        this.width = 240 * this.sizeIndex;
        this.height = 240 * this.sizeIndex;
        this.x = Math.floor(Math.random() * ((this.game.width - this.width) - 0 + 1)) + 0;
        this.y = Math.floor(Math.random() * ((-this.height) - (-this.game.height) + 1)) + (-this.game.height);
        this.vx = this.game.objectVx
        this.isDeleted = false

        const img = new Image();
        img.src = imgEnemy.src;
        this.image = img;
    }

    update(){
        if(this.x < 0 || this.x > this.game.width - this.width) this.vx *= -1;
        this.x += this.vx;
        this.y += this.game.objectVy;

        if(this.y > this.game.height) {
            this.isDeleted = true
        }

        const bullets = this.game.player.bullets
        bullets.forEach(bullet => {
            if(bullet.x < this.x + this.width && bullet.x + bullet.width > this.x && bullet.y < this.y + this.height 
                && bullet.height + bullet.y > this.y) {
                    this.isDeleted = true
                }
        })
    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
