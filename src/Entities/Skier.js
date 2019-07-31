import * as Constants from "../Constants";
import { Entity } from "./Entity";

export class Skier extends Entity {

    constructor(x, y) {
        super(x, y);

        this.assetName = Constants.SKIER_LEFT;
        this.direction = Constants.SKIER_DIRECTIONS.LEFT;
        this.speed = Constants.SKIER_STARTING_SPEED;
        this.jumpCount = 0;
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    }

    updateAsset() {
        this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
    }

    move() {
        if (this.direction === Constants.SKIER_DIRECTIONS.CRASH) return;

        if (this.jumpHangTimeCounter > 0) {
            this.moveSkierDown()
            this.attemptToLandJump();
            return;
        }

        switch (this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
        }
    }

    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() {
        const isJumping = this.isJumping();
        this.y += isJumping ? this.speed / Constants.SKIER_JUMPING_SPEED_REDUCER : this.speed;
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    moveSkierUp() {
        // we can't go higher than the hill!
        if (this.y > 0) {
            this.y -= Constants.SKIER_STARTING_SPEED;
        }
    }

    turnLeft() {
        switch (this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT:
                this.moveSkierLeft()
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
                break;
            case Constants.SKIER_DIRECTIONS.CRASH:
                this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
                this.moveSkierLeft();
                break;
            case Constants.SKIER_DIRECTIONS.JUMPING:
                break;
            default:
                this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
                break;
        }
    }

    turnRight() {
        switch (this.direction) {
            case Constants.SKIER_DIRECTIONS.RIGHT:
                this.moveSkierRight()
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
                break;
            case Constants.SKIER_DIRECTIONS.CRASH:
                this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
                this.moveSkierRight();
                break;
            case Constants.SKIER_DIRECTIONS.JUMPING:
                break;
            default:
                this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
                break;
        }
    }

    turnUp() {
        switch (this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT:
            case Constants.SKIER_DIRECTIONS.RIGHT:
                this.moveSkierUp();
                break;
            case Constants.SKIER_DIRECTIONS.CRASH:
                this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
                this.moveSkierUp();
                break;
            case Constants.SKIER_DIRECTIONS.JUMPING:
                break;
            default:
                this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
                break;
        }
    }

    stop() {
        // skid stop!
        this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
    }

    turnDown() {
        switch (this.direction) {
            case Constants.SKIER_DIRECTIONS.JUMPING:
                break;
            default:
                console.log('TURN DOWN FOR WHAT!?');
                this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
                break;
        }
    }

    jump() {
        switch (this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.setDirection(Constants.SKIER_DIRECTIONS.JUMPING);
                this.jumpHangTimeCounter = Constants.SKIER_EXPECTED_JUMP_HANGTIME;
                break;
        }
    }

    attemptToLandJump() {
        this.jumpHangTimeCounter--;
        if (this.jumpHangTimeCounter <= 0) {
            this.jumpCount++;
            this.jumpHangTimeCounter = 0;
            this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        }
    }

    isJumping() {
        return this.direction === Constants.SKIER_DIRECTIONS.JUMPING;
    }
}