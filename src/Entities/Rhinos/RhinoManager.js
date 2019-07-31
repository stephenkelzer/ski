import { Rhino } from "./Rhino";
import { randomInt } from '../../Core/Utils';

export class RhinoManager {

    SKIER_DESCENT_TO_ACTIVATE = 10000
    RHINO_INSERT_WINDOW_BUFFER = 20
    NEW_RHINO_CHANCE = 50;

    constructor() {
        this.active = false;
        this.rhinos = [];
    }

    getRhinos() {
        return this.rhinos;
    }

    turnOnTheFun(skier, forcePartyPooping) {
        if (forcePartyPooping) {
            this.active = false
        } else if (!this.active && skier.y > this.SKIER_DESCENT_TO_ACTIVATE) {
            this.active = true;
        }
    }

    drawRhinos(canvas, assetManager) {
        this.rhinos.forEach((rhino) => {
            rhino.draw(canvas, assetManager);
        });
    }

    spawnRhino(gameWindow, skier) {
        if (this.active) {
            const shouldSpawnNewRhino = randomInt(1, this.NEW_RHINO_CHANCE);
            if (shouldSpawnNewRhino === this.NEW_RHINO_CHANCE) {
                const spawnY = randomInt(skier.y, gameWindow.bottom);
                this.rhinos.push(new Rhino((gameWindow.right + this.RHINO_INSERT_WINDOW_BUFFER), spawnY));
            }
        }
    }

    moveRhinos(gameWindow) {
        // kill rhinos that got away
        this.rhinos = this.rhinos.filter(x => x.x > gameWindow.left);

        this.rhinos.forEach(x => x.moveLeft());
    }
}