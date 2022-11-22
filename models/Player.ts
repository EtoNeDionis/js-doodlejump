import { Game } from "./Game";
import imgHeroRight from "../public/heroRight.png"
import imgHeroLeft from "../public/heroLeft.png"
import { Input } from "./Input";
import { Bullet } from "./Bullet";


export class Player {
    game: Game;
    sizeIndex: number;
    width: number;
    height: number;
    x: number;
    y: number;
    image: CanvasImageSource;
    vx: number;
    maxVx: number;

    //momentum
    minY: number;
    minVy: number;
    maxVy: number;
    vy: number;
    weight: number;

    bullets: Bullet[]

    constructor(game: Game) {
        this.game = game
        this.sizeIndex = .7;
        this.width = 100 * this.sizeIndex;
        this.height = 120 * this.sizeIndex;

        this.x = this.game.platforms.filter(platform => platform.type === "green").slice(-1)[0].x + 6;
        this.y = this.game.platforms.filter(platform => platform.type === "green").slice(-1)[0].x - this.height;

        this.vx = 0;
        this.minY = this.game.height / 2 - 100;
        this.maxVx = 8;
        this.minVy = -18;
        this.maxVy = this.game.platforms[0].height;
        this.vy = this.minVy;
        this.weight = .5;

        const img = new Image();
        img.src = imgHeroRight.src;

        this.image = img;

        this.bullets = []
    }

    update(input: Input) {
        this.x += this.vx;

        if (input.keys.includes("ArrowLeft")) {

            this.vx = -this.maxVx;
        } else if (input.keys.includes("ArrowRight")) {

            this.vx = this.maxVx;
        } else {
            this.vx = 0;
        }

        // horizontal movement
        if (this.x < -this.width / 2) this.x = this.game.width - this.width / 2;
        if ((this.x + this.width / 2) > this.game.width) this.x = -this.width / 2;

        // vertical movement
        if (this.vy > this.weight) {
            let platformType = this.isOnPlatform();
            if (platformType === "green" || platformType === "white") this.vy = this.minVy;
        }

        if (this.vy < this.maxVy) this.vy += this.weight;
        if (this.y > this.minY || this.vy > this.weight) this.y += this.vy;

        if (this.y <= this.minY && this.vy < this.weight) this.game.objectVy = -this.vy;
        else this.game.objectVy = 0;

        if (this.isCollision()) {
            this.game.gameEnded = true;
        }

        if (this.y > this.game.height && !this.game.gameEnded) {
            this.game.gameEnded = true;

        }


        if (input.bulletCount > 0) {
            input.bulletCount--
            this.bullets.push(new Bullet(this))
        }

        this.bullets.forEach((bullet) => {
            bullet.update()
        })
        this.bullets = this.bullets.filter(bullet => !bullet.isDeleted)
    }

    draw(context: CanvasRenderingContext2D) {
        this.bullets.forEach(bullet => bullet.draw(context))
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    isOnPlatform() {
        let type = null;

        const playerHitBox = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        }

        this.game.platforms.forEach(platform => {
            const xTest = (playerHitBox.x > platform.x && playerHitBox.x < platform.x + platform.width
                || playerHitBox.x + playerHitBox.width > platform.x && playerHitBox.x + playerHitBox.width < platform.x + platform.width
            )

            const yTest = (platform.y - (playerHitBox.y + playerHitBox.height) <= 0) &&
                (platform.y - (playerHitBox.y + playerHitBox.height) >= -platform.height);

            if (xTest && yTest) {
                type = platform.type;
                platform.isDeleted = (type === "brown") ? true : false;
            }
        })

        return type;
    }

    //  rectangular collission
    isCollision() {
        let res = false;
        const playerHitBox = {
            x: this.x,
            y: this.y,
            width: this.weight,
            height: this.height
        }


        this.game.enemies.forEach(enemy => {
            if (playerHitBox.x < enemy.x + enemy.width && playerHitBox.x + playerHitBox.width > enemy.x &&
                playerHitBox.y < enemy.y + enemy.height &&
                playerHitBox.height + playerHitBox.y > enemy.y) {
                res = true;
            }
        })
        return res;
    }

    changeImgRight() {
        const img = new Image();
        img.src = imgHeroRight.src;
        this.image = img;
    }

    changeImgLeft() {
        const img = new Image();

        img.src = imgHeroLeft.src;
        this.image = img;
    }
}