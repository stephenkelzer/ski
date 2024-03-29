import * as Constants from "../../Constants";
import { Entity } from "../Entity";
import { randomInt } from '../../Core/Utils';

const assetTypes = [
    Constants.TREE,
    Constants.TREE_CLUSTER,
    Constants.ROCK1,
    Constants.ROCK2,
    Constants.JUMP
];

export class Obstacle extends Entity {
    constructor(x, y) {
        super(x, y);

        const assetIdx = randomInt(0, assetTypes.length - 1);
        this.assetName = assetTypes[assetIdx];
        this.canJumpOver = (this.assetName === Constants.ROCK1 || this.assetName === Constants.ROCK2)
        this.isJump = this.assetName === Constants.JUMP;
    }
}