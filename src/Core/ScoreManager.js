export class ScoreManager {

    DESCENT_SCORE_MODIFIER = 10;
    JUMP_SCORE_MODIFIER = 100;
    OBSTACLE_JUMPING_SCORE_MODIFIER = 1000;

    constructor() {
        this.score = 0;
    }

    calculateScore(skier) {
        const descentScore = Math.floor(skier.y / this.DESCENT_SCORE_MODIFIER);
        const jumpingScore = skier.jumpCount * this.JUMP_SCORE_MODIFIER;
        const obstaclesJumpedOverScore = skier.objectsJumpedOver * this.OBSTACLE_JUMPING_SCORE_MODIFIER;

        const totalScore = descentScore + jumpingScore + obstaclesJumpedOverScore;
        
        this.score = totalScore > 0 ? totalScore : 0;
    }

    drawScore(canvas) {
        canvas.drawText(`Score: ${this.score}`, 25, 10, 50);
    }
}