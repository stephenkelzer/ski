import "babel-polyfill";
import { Game } from "../../Core/Game";
import { RhinoManager } from "./RhinoManager";
import { Rhino } from "./Rhino";

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

    // prevent deleting rhinos
    mockRhinoManager.rhinos.filter = jest.fn((_) => mockRhinoManager.rhinos);

    mockRhinoManager.rhinos.push(new Rhino(1, 1));
    mockRhinoManager.rhinos.push(new Rhino(2, 2));
    mockRhinoManager.rhinos.push(new Rhino(3, 3));
});

test('Rhinos move', () => {
    const initialRhinos = mockRhinoManager.getRhinos();
    expect(initialRhinos[0].x).toBe(1);
    expect(initialRhinos[0].y).toBe(1);
    mockRhinoManager.moveRhinos(mockGame.gameWindow);
    expect(initialRhinos[0].x).toBe(-11);
    expect(initialRhinos[0].y).toBe(1);
});