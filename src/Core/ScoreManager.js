export class ScoreManager {

    SCORE_MODIFIER = 10

    constructor() {
        this.score = 0;
    }

    calculateScore(skier) {
        this.score = Math.floor(skier.y / this.SCORE_MODIFIER);
    }

    drawScore(canvas) {
        canvas.drawText(`Score: ${this.score}`, 25, 10, 50);
    }
}