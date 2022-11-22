import { Background } from "./Background";
import { Enemy } from "./Enemy";
import { Input } from "./Input";
import { Platform } from "./Platform";
import { Player } from "./Player";

export class Game {
    width: number;
    height: number;
    background: Background;
    isStarted: boolean;
    gameEnded: boolean;
    input: Input;

    level: number;

    platforms: Platform[];
    platformGap: number;

    player: Player;
    enemies: Enemy[];
    enemyChance: number;

    objectVx: number;
    objectVy: number;

    whitePlatformChance = .2;
    brownPlatformChance = .5;

    maxPlatformsGap: number;
    maxEnemyChance: number;
    maxObjectVx: number;

    score: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.background = new Background(this);
        this.gameEnded = false;
        this.isStarted = false;
        this.input = new Input(this);

        this.level = 0;

        this.objectVx = 2;
        this.objectVy = 0;

        this.platforms = [];
        this.platformGap = 100;
        this.addPlatforms(0, this.height - 15);

        this.addPlatforms(-this.height, -15);


        this.player = new Player(this);
        this.enemies = [];
        this.enemyChance = 0;

        this.maxObjectVx = 10;
        this.maxEnemyChance = .6;
        this.maxPlatformsGap = 200;

        this.score = 0;
    };

    update() {
        this.background.update();

        this.platforms.forEach(platform => {
            platform.update();
        })

        this.enemies.forEach(enemy => {
            enemy.update();
        })

        this.player.update(this.input);

        this.platforms = this.platforms.filter(platform => !platform.isDeleted);
        this.enemies = this.enemies.filter(enemy => !enemy.isDeleted);
    }

    draw(context: CanvasRenderingContext2D) {
        this.background.draw(context)

        if (!this.isStarted) {
            context.font = "20px bold"
            context.textAlign = "center";
            context.fillText("Press ENTER to start", this.width * .5, this.height * .5);
        } else {
            this.platforms.forEach(platform => {
                platform.draw(context)
            })

            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            })

            context.font = "bold 28px serif";
            context.fillText(`Score ${this.score}`, 100, 50);

            if (this.gameEnded) {
                context.font = "40px red";
                context.fillText("GAME OVER", this.width * .5, this.height * .5);
            }
        }

    }

    makeHarder() {
        this.level++;
        if(this.maxPlatformsGap > this.platformGap) {
            this.platformGap += 5;
        }

        if(this.maxEnemyChance < this.enemyChance) {
            this.enemyChance += 5;
        }

        if(this.level % 6 === 0 && this.maxObjectVx < this.objectVx) {
            this.objectVx++;
        }

        if(this.level % 5 === 0 && this.maxEnemyChance > this.enemyChance) {
            this.enemyChance += 5
        }
    }

    addEnemy() {
        this.enemies.push(new Enemy(this));
    }

    addPlatforms(lowerY: number, upperY: number) {
        do {
            let type = "green";
            const rand = Math.random();
            if (rand < this.whitePlatformChance + this.brownPlatformChance) {
                type = "white";
            }

            this.platforms.unshift(new Platform(this, lowerY, upperY, type));
        } while (this.platforms[0].y >= lowerY)
    }

    addBrokenPlatforms(lowerY: number, upperY: number) {
        const num = Math.floor(Math.random() * (5 - 0 + 1)) + 0;

        for (let i = 0; i < num; i++) {
            this.platforms.push(new Platform(this, lowerY, upperY, "brown"))
        }
    }
}


