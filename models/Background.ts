import { Game } from "./Game";
import imgBg from "../public/background.jpg"


export class Background {
    game: Game;
    width: number;
    height: number;
    image: HTMLImageElement | null;
    x: number;
    y: number;

    constructor(game: Game) {
        this.game = game;
        this.width = this.game.width;
        this.height = this.game.height;
        this.x = 0;
        this.y = 0;

        const bgImg = new Image();
        bgImg.src = imgBg.src;
        this.image = bgImg;
    }

    update() {
        if (this.y > this.height) {
            this.y = 0;
            this.game.addPlatforms(-this.height, -15);
            this.game.addBrokenPlatforms(-this.height, -15);
            this.game.makeHarder();

            if(Math.random() < this.game.enemyChance) {
                this.game.addEnemy();
            }
        } else {
            this.y += this.game.objectVy;
            this.game.score += Math.trunc(this.game.objectVy * .1);
        }

    }

    draw(context: CanvasRenderingContext2D) {
        if (!this.image) return;
        context.drawImage(this.image, this.x, this.y);
        context.drawImage(this.image, this.x, this.y - this.height);
    }
}