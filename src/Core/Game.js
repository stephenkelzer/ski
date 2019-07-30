import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';
import { ScoreManager } from "./ScoreManager";

export class Game {

    constructor() {
        this.gameWindow = null;
        this.isPaused = false;
        this.isGameOver = false;
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0);
        this.obstacleManager = new ObstacleManager();
        this.scoreManager = new ScoreManager();

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

        const previousGameWindow = this.gameWindow;
        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);

        this.scoreManager.calculateScore(this.skier);
        
        this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);

        if (this.skier.isCrashed()) {
            this.isGameOver = true;
        }
    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);
        this.scoreManager.drawScore(this.canvas);
        this.skier.draw(this.canvas, this.assetManager);
        this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
    }

    drawPauseMenu() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);
        this.scoreManager.drawScore(this.canvas);

        const middleX = Constants.GAME_WIDTH / 2;
        const middleY = Constants.GAME_HEIGHT / 2;
        this.canvas.drawCenteredText("Game Paused!", 40, middleX, middleY - 50);
        this.canvas.drawCenteredText("Press 'P' to shred some more gnar", 18, middleX, middleY)
    }

    drawGameOverWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

        const middleX = Constants.GAME_WIDTH / 2;
        const middleY = Constants.GAME_HEIGHT / 2;

        this.canvas.drawCenteredText(`Final Score: ${this.scoreManager.score}`, 18, middleX, middleY - 150);
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

        switch(event.which) {
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
}