import "babel-polyfill";
import { Skier } from "./Skier";
import * as Constants from "../Constants";
import { Game } from "../Core/Game";

let mockGame = null;

beforeEach(() => {
    // mock canvas context
    window.HTMLCanvasElement.prototype.getContext = () => {
        return {
            scale: () => { return {} }
        };
    };

    mockGame = new Game();
});

test('Skier was created', () => {
    expect(mockGame).not.toBeNull();
    expect(mockGame.skier).not.toBeNull();
    expect(mockGame.skier.getPosition()).toMatchObject({ x: 0, y: 0 });
    expect(mockGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
});

describe('Skier can move', () => {

    beforeEach(() => {
        mockGame.skier = new Skier(15, 246);
    })

    test('left', () => {
        mockGame.skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
        expect(mockGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
        mockGame.skier.move();
        expect(mockGame.skier.getPosition()).toMatchObject({ x: 7.928864375618724, y: 253.07113562438127 })
    });

    test('right', () => {
        mockGame.skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
        expect(mockGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
        mockGame.skier.move();
        expect(mockGame.skier.getPosition()).toMatchObject({ x: 22.071135624381277, y: 253.07113562438127 })
    });

    test('down', () => {
        mockGame.skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        expect(mockGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.DOWN);
        mockGame.skier.move();
        expect(mockGame.skier.getPosition()).toMatchObject({ x: 15, y: 256 })
    });

});

describe('Skier recovers from crash', () => {

    beforeEach(() => {
        mockGame.skier = new Skier(-46, 130);
    })

    test('to the left', () => {
        mockGame.skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        expect(mockGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
        mockGame.skier.turnLeft();
        expect(mockGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
        expect(mockGame.skier.getPosition()).toMatchObject({ x: -56, y: 130 })
    });

    test('to the right', () => {
        mockGame.skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        expect(mockGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
        mockGame.skier.turnRight();
        expect(mockGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
        expect(mockGame.skier.getPosition()).toMatchObject({ x: -36, y: 130 })
    });

    test('upwards', () => {
        mockGame.skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        expect(mockGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
        mockGame.skier.turnUp();
        expect(mockGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
        expect(mockGame.skier.getPosition()).toMatchObject({ x: -46, y: 120 })
    });

});