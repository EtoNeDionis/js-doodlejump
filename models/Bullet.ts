import { Player } from './Player';
export class Bullet {
    player: Player
    sizeIndex: number
    width: number
    height: number
    x: number
    y: number
    vy: number
    isDeleted: boolean

    constructor(player: Player) {
        this.player = player
        this.sizeIndex = .1
        this.width = 160 * this.sizeIndex
        this.height = 500 * this.sizeIndex
        this.x = this.player.x + this.player.width / 2 - this.width / 2
        this.y = this.player.y + this.player.height / 2 - this.height / 2
        this.vy = -20
        this.isDeleted = false
    }

    update() {
        this.y += this.vy;
        if(this.y < -this.height) this.isDeleted = true;
    }

    draw(context: CanvasRenderingContext2D) {
        context.strokeRect(this.x, this.y, this.width, this.height)
    }
}