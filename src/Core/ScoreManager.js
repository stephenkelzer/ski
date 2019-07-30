export class ScoreManager {

    SCORE_MODIFIER = 10

    constructor() {
        this.score = 0;
    }

    calculateScore(skier) {
        const score = Math.floor(skier.y / this.SCORE_MODIFIER)
        this.score = score > 0 ? score : 0;
    }

    drawScore(canvas) {
        canvas.drawText(`Score: ${this.score}`, 25, 10, 50);
    }
}