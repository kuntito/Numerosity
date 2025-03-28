import GridDim from "./GridDim";
import ScreenType from "./ScreenTypes";

interface GameConfig {
    startScreen: ScreenType;
    gridDim: GridDim;
    questionDurationMillis: number;
    overlayDurationMillis: number;
    totalQuestions: number;
}

export default GameConfig;