import "babel-polyfill";
import { Game } from "./Game";
import { ScoreManager } from "./ScoreManager";

let mockGame = null;
let mockScoreManager = null;

beforeEach(() => {
    // mock canvas context
    window.HTMLCanvasElement.prototype.getContext = () => {
        return {
            scale: () => { return {} }
        };
    };

    mockGame = new Game();
    mockScoreManager = new ScoreManager();
});

test('Score starts at 0', () => {
    expect(mockScoreManager.getScore()).toBe(0);
});

test('Score increments', () => {
    expect(mockScoreManager.getScore()).toBe(0);
    mockGame.skier.moveSkierDown();
    mockScoreManager.updateDescentScore(mockGame.skier);
    expect(mockScoreManager.getScore()).toBe(100);
});

test('Score cant be negative', () => {
    mockGame.skier.moveSkierUp();
    mockScoreManager.updateDescentScore(mockGame.skier);
    expect(mockScoreManager.getScore()).toBe(0);
});

test('Score increments after jumping over obstacle', () => {
    expect(mockScoreManager.getScore()).toBe(0);
    mockScoreManager.logObstacleJumpedOver();
    expect(mockScoreManager.getScore()).toBe(1000);
});

test('Score increments after jumping over rhino', () => {
    expect(mockScoreManager.getScore()).toBe(0);
    mockScoreManager.logRhinoJumpedOver();
    expect(mockScoreManager.getScore()).toBe(1000000);
})