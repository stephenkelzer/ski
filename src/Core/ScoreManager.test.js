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
    mockScoreManager.calculateScore(mockGame.skier);
    expect(mockScoreManager.score).toBe(0);
});

test('Score increments', () => {
    mockGame.skier.moveSkierDown();
    mockScoreManager.calculateScore(mockGame.skier);
    expect(mockScoreManager.score).toBe(1);
});

test('Score cant be negative', () => {
    mockGame.skier.moveSkierUp();
    mockScoreManager.calculateScore(mockGame.skier);
    expect(mockScoreManager.score).toBe(0);
});