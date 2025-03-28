// this store should navigation, the previous lesson score

import { create } from "zustand";
import GameStats from "../models/GameStats";
import ScreenType from "../models/ScreenTypes";
import GameConfig from "../models/GameConfig";
import AppState from "../models/AppState";

interface AppStore {
    state: AppState;
    initializeGameConfig: (config: GameConfig) => void;
    navigateTo: (nextScreen: ScreenType) => void;
    updateLastGameStat: (lastGameStats: GameStats) => void;
    endGame: () => void;
}

const defaultState: AppState = {
    currScreen: ScreenType.start,
    prevGameStat: null,
    config: {} as GameConfig,
    isInitialized: false,
    displayCloseButton: false,
    showEndDialog: false,
};

const useAppStore = create<AppStore>((set) => ({
    state: defaultState,
    initializeGameConfig: (config: GameConfig) => {
        set((store) => {
            return {
                state: {
                    ...store.state,
                    config: config,
                    isInitialized: true,
                    currScreen: config.startScreen
                }
            }
        })
    },
    navigateTo: (nextScr: ScreenType) => {
        set((store) => {
            return {
                state: {
                    ...store.state,
                    currScreen: nextScr,
                    displayCloseButton: nextScr !== ScreenType.start
                },
            };
        });
    },
    updateLastGameStat: (gameStat: GameStats) => {
        set((store) => {
            return {
                state: {
                    ...store.state,
                    prevGameStat: gameStat,
                },
            };
        });
    },
    endGame: () => {
        // what would this do?
        set((store) => {
            return {
                state: {
                    ...store.state,
                }
            }
        })
    }
}));

export default useAppStore;
