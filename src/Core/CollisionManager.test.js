import "babel-polyfill";
import { Game } from "../Core/Game";
import { CollisionManager } from "./CollisionManager";
import { Rect } from "./Utils";
import { Obstacle } from "../Entities/Obstacles/Obstacle";
import * as Constants from "../Constants";
import { Rhino } from "../Entities/Rhinos/Rhino";

let mockGame = null;
let mockCollisionManager = null;

beforeEach(() => {
    // mock canvas context
    window.HTMLCanvasElement.prototype.getContext = () => {
        return {
            scale: () => { return {} }
        };
    };

    mockGame = new Game();
    mockGame.assetManager.getAsset = jest.fn(() => { return { width: 10, height: 10 } });
    mockGame.skier.getCollisionBounds = jest.fn((asetManager) => { return new Rect(0, 0, 10, 10) });

    let obstacle = new Obstacle(5, 5)
    obstacle.assetName = Constants.TREE;
    obstacle.getCollisionBounds = jest.fn((asetManager) => { return new Rect(0, 0, 10, 10) });
    mockGame.obstacleManager.obstacles.push(obstacle);

    let rhino = new Rhino(5, 5);
    rhino.getCollisionBounds = jest.fn((asetManager) => { return new Rect(0, 0, 10, 10) });
    mockGame.rhinoManager.rhinos.push(rhino);

    mockCollisionManager = new CollisionManager();
});

test('Obstacle collision causes skier to crash', () => {
    mockCollisionManager.checkIfSkierBailedOnAnObstacle(mockGame.skier, mockGame.obstacleManager, mockGame.assetManager, mockGame.scoreManager);
    expect(mockGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
});

test('Rhino collision causes skier to crash and game to be over', () => {
    const results = mockCollisionManager.checkIfRhinoCaughtSkier(mockGame.skier, mockGame.rhinoManager, mockGame.assetManager, mockGame.scoreManager);
    expect(mockGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
    expect(results).toBe(true);
});

test('modify score correctly', () => {
    expect(mockGame.scoreManager.getScore()).toBe(0);

    mockGame.skier.direction = Constants.SKIER_DIRECTIONS.JUMPING;

    const results = mockCollisionManager.checkIfRhinoCaughtSkier(mockGame.skier, mockGame.rhinoManager, mockGame.assetManager, mockGame.scoreManager);
    expect(results).toBe(false);
    expect(mockGame.skier.direction).not.toBe(Constants.SKIER_DIRECTIONS.CRASH);
    expect(mockGame.scoreManager.getScore()).toBe(1000000);
});