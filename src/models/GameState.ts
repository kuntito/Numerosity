// what things change during game play
// time

import CellModel from "./CellModel";
import GameEndStatus from "./GameEndStatus";
import GridDim from "./GridDim";
import QuestionDetails from "./QuestionDetails";

// grid items
// target number
// target variable
// the above three are connected,
// it makes sense to group them together, gridInfo

interface GameState {
    isStarted: boolean;
    questionDetails: QuestionDetails;
    gridDim: GridDim;
    grid: CellModel[][];
    currentSelections: CellModel[];
    endStatus?: GameEndStatus;
    qCount: number;
    totalQuestions: number;
    questionDurationMillis: number;
    score: number;
    isLastQuestion: boolean;
}

export default GameState;
