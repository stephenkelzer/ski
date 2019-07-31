import { Rhino } from "./Rhino";
import { randomInt } from '../../Core/Utils';

export class RhinoManager {

    RHINO_INSERT_WINDOW_BUFFER = 20
    INITIAL_NEW_RHINO_CHANCE = 50;

    constructor() {
        this.active = false;
        this.rhinos = [];
        this.newRhinoChance = this.INITIAL_NEW_RHINO_CHANCE;
    }

    getRhinos() {
        return this.rhinos;
    }

    drawRhinos(canvas, assetManager) {
        this.rhinos.forEach((rhino) => {
            rhino.draw(canvas, assetManager);
        });
    }

    spawnRhino(gameWindow, skier) {
        if (this.active) {
            const shouldSpawnNewRhino = randomInt(1, this.newRhinoChance);
            if (shouldSpawnNewRhino === this.newRhinoChance) {
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