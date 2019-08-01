export class ScoreManager {

    DESCENT_SCORE_MODIFIER = 10;
    OBSTACLE_JUMPING_SCORE_MODIFIER = 1000;
    RHINOS_JUMPING_SCORE_MODIFIER = 1000000;

    constructor() {
        this.obstaclesJumpedOver = 0;
        this.rhinosJumpedOver = 0;
        this.descentScore = 0;
    }

    updateDescentScore(skier) {
        if (skier.y > this.descentScore) {
            this.descentScore = Math.floor(skier.y);
        }
    }

    logObstacleJumpedOver() {
        this.obstaclesJumpedOver++;
    }

    logRhinoJumpedOver() {
        this.rhinosJumpedOver++;
    }

    getScore() {
        const generalScore = this.descentScore * this.DESCENT_SCORE_MODIFIER;
        const obstaclesJumpedOverScore = this.obstaclesJumpedOver * this.OBSTACLE_JUMPING_SCORE_MODIFIER;
        const rhinosJumpedOverScore = this.rhinosJumpedOver * this.RHINOS_JUMPING_SCORE_MODIFIER;

        const totalScore = generalScore + obstaclesJumpedOverScore + rhinosJumpedOverScore;

        return totalScore > 0 ? totalScore : 0;
    }
}