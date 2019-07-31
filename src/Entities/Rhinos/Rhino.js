import * as Constants from "../../Constants";
import { Entity } from "../Entity";

export class Rhino extends Entity {

    constructor(x, y) {
        super(x, y);
        this.speed = Constants.RHINO_STARTING_SPEED;
        this.distanceTravelled = 0;
        this.assetName = Constants.RHINO1;
    }

    flipRunningAsset() {
        this.assetName = this.assetName === Constants.RHINO1 ? Constants.RHINO2 : Constants.RHINO1;
    }

    moveLeft() {
        // move the rhino to the left!
        this.x -= this.speed;
        this.distanceTravelled++;

        if (this.distanceTravelled % 8 < 1) {
            this.flipRunningAsset();
        }
    }
}