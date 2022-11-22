import { Game } from "./Game";

export class Input {
    game: Game;
    keys: string[];
    bulletCount: number;

    constructor(game: Game) {
        this.game = game;
        this.keys = [];
        this.bulletCount = 0

        window.addEventListener('keydown', (e) => {

            switch (e.key) {

                case "Enter":
                    this.game.isStarted = true;
                    break;
                case "Escape":
                    this.game.isStarted = false;
                    break;
                case "ArrowLeft":
                    if (this.keys.includes(e.key)) break;
                    this.game.player.changeImgLeft();
                    this.keys.push(e.key);
                    break;
                case "ArrowRight":
                    if (this.keys.includes(e.key)) break;
                    this.game.player.changeImgRight();
                    this.keys.push(e.key);
                    break;
                case "r":
                    break;
                default:
                    break;
            }
        })

        window.addEventListener('keyup', (e) => {
            if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && this.keys.includes(e.key)) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            if(e.key === "ArrowUp" && this.game.player.bullets.length < 3) {
                this.bulletCount++
            }
        })
    };


}