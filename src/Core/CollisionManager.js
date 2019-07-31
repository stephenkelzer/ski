import { intersectTwoRects } from "./Utils";
import * as Constants from "../Constants";


export class CollisionManager {

    checkIfSkierBailedOnAnObstacle(skier, obstacleManager, assetManager, scoreManager) {
        const skierBounds = skier.getCollisionBounds(assetManager);
        const collision = obstacleManager.getObstacles().find((obstacle) => {
            const obstacleBounds = obstacle.getCollisionBounds(assetManager);
            return intersectTwoRects(skierBounds, obstacleBounds);
        });

        if (collision) {
            if (collision.isJump) {
                skier.jump();
            } else if (collision.canJumpOver && skier.isJumping()) {
                scoreManager.logObstacleJumpedOver();
            } else {
                // WIPE OUT!
                skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
            }
        }
    }

    checkIfRhinoCaughtSkier(skier, rhinoManager, assetManager, scoreManager) {
        const skierBounds = skier.getCollisionBounds(assetManager);

        const caught = rhinoManager.getRhinos().find((rhino) => {
            const rhinoBounds = rhino.getCollisionBounds(assetManager);
            return intersectTwoRects(skierBounds, rhinoBounds);
        });

        if (caught && skier.isJumping()) {
            scoreManager.logRhinoJumpedOver();
        } else if (caught) {
            skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
            return true;
        }

        return false
    }
}