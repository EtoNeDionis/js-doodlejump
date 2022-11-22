import { Game } from "./Game";
import imgGreen from "../public/greenPlatform.png"
import imgBrown from "../public/brownPlatform.png"
import imgWhite from "../public/whitePlatform.png"


export class Platform {
    game: Game;
    width: number;
    height: number;
    type: string;
    x: number;
    y: number;
    image: CanvasImageSource;
    vx: number;
    isDeleted: boolean;

    constructor(game: Game, lowerY: number, upperY: number, type: string) {
        this.game = game;
        this.width = 150;
        this.height = 15;
        this.type = type;
        this.x = Math.floor(Math.random() * ((this.game.width - this.width) - 0 + 1)) + 0;
        this.y = this.calcY(upperY, lowerY);
        this.isDeleted = false;

        const imgPlatform = new Image();

        switch (type) {
            case "green":
                imgPlatform.src = imgGreen.src;
                break;
            case "white":
                imgPlatform.src = imgWhite.src;
                break;
            case "brown":
                imgPlatform.src = imgBrown.src;
                break;
            default:
                break;
        }
        this.image = imgPlatform;

        this.vx = this.type === "white" ? this.game.objectVx : 0;

    }

    update() {

        if (this.type === "white") {
            if (this.x < 0 || this.x > this.game.width - this.width) this.vx *= -1;
        }

        if (this.type === "brown" && this.y >= this.game.height) {
            this.isDeleted = true;
        }

        this.x += this.vx;
        this.y += this.game.objectVy;
    }

    draw(context: CanvasRenderingContext2D) {
        context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    calcY(upperY: number, lowerY: number): number {
        if (this.type !== "brown") {
            if (!this.game.platforms.length) {
                return Math.floor(Math.random() * (upperY - (upperY - 100) + 1)) + (upperY - 100);
            }
            return this.game.platforms[0].y
                - (Math.floor(Math.random() * (this.game.platformGap - (this.game.platformGap - 30) + 1)) + (this.game.platformGap - 30))
        } else {
            let y;
            do {
                y = Math.floor(Math.random() * (upperY - lowerY + 1)) + lowerY;
            } while (this.closeToPlatforms(y));
        }

        return 0;
    }

    closeToPlatforms(y: number) {
        for (let i = 0; i < this.game.platforms.length; i++) {
            const iPlatform = this.game.platforms[i];
            const margin = 10;

            if ((y + this.height >= iPlatform.y - margin && y + this.height <= iPlatform.y + this.height + margin) ||
                (y >= iPlatform.y - margin && y <= iPlatform.y + this.height + margin)) {
                return true;
            }
        }

        return false;
    }
}