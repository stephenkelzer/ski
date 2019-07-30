import "babel-polyfill";
import * as Constants from "../Constants";
import { Game } from "./Game";

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

test('Game was created', () => {
    expect(mockGame).not.toBeNull();
    expect(mockGame.skier).not.toBeNull();
    expect(mockGame.skier.getPosition()).toMatchObject({ x: 0, y: 0 });
    expect(mockGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
});