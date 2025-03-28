import GameConfig from "./GameConfig";
import GameStats from "./GameStats";
import ScreenType from "./ScreenTypes";

interface AppState {
    currScreen: ScreenType;
    prevGameStat: GameStats | null;
    config: GameConfig;
    isInitialized: boolean,
    displayCloseButton: boolean;
    showEndDialog: boolean;
}

export default AppState;