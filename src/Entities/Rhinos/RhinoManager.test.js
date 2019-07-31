import "babel-polyfill";
import { Game } from "../../Core/Game";
import { RhinoManager } from "./RhinoManager";

let mockGame = null;
let mockRhinoManager = null;

beforeEach(() => {
    // mock canvas context
    window.HTMLCanvasElement.prototype.getContext = () => {
        return {
            scale: () => { return {} }
        };
    };

    mockGame = new Game();
    mockRhinoManager = new RhinoManager();
});

test('The fun turns on', () => {
    expect(mockRhinoManager.active).toBe(false);
    
    mockRhinoManager.turnOnTheFun(mockGame.skier);

    expect(mockRhinoManager.active).toBe(false);

    mockGame.skier.y = mockRhinoManager.SKIER_DESCENT_TO_ACTIVATE + 5;
    mockRhinoManager.turnOnTheFun(mockGame.skier);

    expect(mockRhinoManager.active).toBe(true);
});