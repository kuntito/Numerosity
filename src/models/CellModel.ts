import GridPos from "./GridPos";

interface CellModel {
    pos: GridPos;
    // `num` is undefined on the blank grid
    num?: number;
}

export default CellModel;