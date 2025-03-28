import CellModel from "../models/CellModel";
import { shuffle } from "./shuffleArray";

const placeNumbersInGrid = (grid: CellModel[][], allNumbers: number[]) => {
    // TODO add docstring
    // shuffle grid positions
    // place numbers in shuffled grid positions
    const gridPositions = grid.flatMap((row) => row.map((cell) => cell.pos));
    shuffle(gridPositions);

    while (allNumbers.length > 0 && gridPositions.length > 0) {
        const { ri, ci } = gridPositions.pop()!;
        grid[ri][ci].num = allNumbers.pop();
    }
};

export default placeNumbersInGrid;