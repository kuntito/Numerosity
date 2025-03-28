import CellModel from "../models/CellModel";
import GridDim from "../models/GridDim";

const generateCellGrid: (dim: GridDim) => CellModel[][] = (dim: GridDim) => {
    const { rows, cols } = dim;

    const grid = [];
    for (let ri = 0; ri < rows; ri++) {
        const row = [];
        for (let ci = 0; ci < cols; ci++) {
            row.push({
                pos: { ri, ci },
            } as CellModel);
        }
        grid.push(row);
    }
    return grid;
};

export default generateCellGrid;
