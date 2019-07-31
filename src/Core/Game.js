import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';
import { ScoreManager } from "./ScoreManager";
import { RhinoManager } from "../Entities/Rhinos/RhinoManager";
import { CollisionManager } from "./CollisionManager";

export class Game {

    constructor() {
        this.gameWindow = null;
        this.isPaused = false;
        this.isGameOver = false;
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0);
        this.obstacleManager = new ObstacleManager();
        this.rhinoManager = new RhinoManager();
        this.scoreManager = new ScoreManager();
        this.collisionManager = new CollisionManager();
        this.level = 1;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    init() {
        this.obstacleManager.placeInitialObstacles();
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    run() {
        this.canvas.clearCanvas();

        this.updateGameWindow();

        if (this.isGameOver) {
            this.drawGameOverWindow();
        } else if (!this.isPaused) {
            this.drawGameWindow();
        } else {
            this.drawPauseMenu();
        }

        requestAnimationFrame(this.run.bind(this));
    }

    updateGameWindow() {
        this.skier.move();
        this.scoreManager.updateDescentScore(this.skier);

        this.rhinoManager.moveRhinos(this.gameWindow);

        const previousGameWindow = this.gameWindow;
        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);
        this.rhinoManager.spawnRhino(this.gameWindow, this.skier);

        this.collisionManager.checkIfSkierBailedOnAnObstacle(this.skier, this.obstacleManager, this.assetManager, this.scoreManager);

        if (this.collisionManager.checkIfRhinoCaughtSkier(this.skier, this.rhinoManager, this.assetManager, this.scoreManager)) {
            this.isGameOver = true;
            this.rhinoManager.active = false;
        }

        this.increaseDifficulty();
    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);
        this.canvas.drawText(`Score: ${this.scoreManager.getScore()}`, 25, 10, 50);
        this.canvas.drawText(`Distance Travelled: ${this.skier.distanceTravelled} ft`, 12, 10, 70);
        this.canvas.drawText(`Current Level: ${this.level}`, 12, 10, 90);
        this.skier.draw(this.canvas, this.assetManager);
        this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
        this.rhinoManager.drawRhinos(this.canvas, this.assetManager);
    }

    drawPauseMenu() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);
        this.canvas.drawText(`Score: ${this.scoreManager.getScore()}`, 25, 10, 50);
        this.canvas.drawText(`Distance Travelled: ${this.skier.distanceTravelled} ft`, 12, 10, 70);
        this.canvas.drawText(`Current Level: ${this.level}`, 12, 10, 90);

        const middleX = Constants.GAME_WIDTH / 2;
        const middleY = Constants.GAME_HEIGHT / 2;
        this.canvas.drawCenteredText("Game Paused!", 40, middleX, middleY - 50);
        this.canvas.drawCenteredText("Press 'P' to shred some more gnar", 18, middleX, middleY)
    }

    drawGameOverWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

        const middleX = Constants.GAME_WIDTH / 2;
        const middleY = Constants.GAME_HEIGHT / 2;

        this.canvas.drawCenteredText(`Final Score: ${this.scoreManager.getScore()}`, 18, middleX, middleY - 160);
        this.canvas.drawCenteredText(`Distance Travelled: ${this.skier.distanceTravelled} ft`, 18, middleX, middleY - 140);
        this.canvas.drawCenteredText(`Current Level: ${this.level}`, 18, middleX, middleY - 120);
        this.canvas.drawCenteredText("GAME OVER!", 40, middleX, middleY - 50);
        this.canvas.drawCenteredText("Press 'P' to shred some more gnar", 18, middleX, middleY);
    }

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    handleKeyDown(event) {
        if ((this.isGameOver || this.isPaused) && event.which !== Constants.KEYS.P) {
            // If we're dead or paused, ignore everything except the 'P' key
            event.preventDefault();
            return;
        }

        switch (event.which) {
            case Constants.KEYS.LEFT:
                this.skier.turnLeft();
                event.preventDefault();
                break;
            case Constants.KEYS.RIGHT:
                this.skier.turnRight();
                event.preventDefault();
                break;
            case Constants.KEYS.UP:
                this.skier.turnUp();
                event.preventDefault();
                break;
            case Constants.KEYS.DOWN:
                this.skier.turnDown();
                event.preventDefault();
                break;
            case Constants.KEYS.SPACE:
                this.skier.jump();
                event.preventDefault();
                break;
            case Constants.KEYS.P:
                if (this.isGameOver) {
                    location.reload();
                } else {
                    this.skier.stop();
                    this.isPaused = !this.isPaused;
                }
                event.preventDefault();
                break;
        }
    }

    increaseDifficulty() {
        //TODO: make this less hardcode: add a DifficultyManager module?
        const distance = this.skier.distanceTravelled;

        if (distance > 2000) {
            this.level = 5;
            this.rhinoManager.newRhinoChance = 1;
        } else if (distance > 1500) {
            this.level = 4;
            this.rhinoManager.newRhinoChance = 5;
        } else if (distance > 1250) {
            this.level = 3;
            this.rhinoManager.newRhinoChance = 10;
            this.obstacleManager.newObstacleChance = 4;
        } else if (distance > 750) {
            this.level = 2;
            this.rhinoManager.newRhinoChance = 30;
            this.obstacleManager.newObstacleChance = 8;
        } else if (distance > 250) {
            this.rhinoManager.active = true;
            this.obstacleManager.newObstacleChance = 10;
        }
    }
}