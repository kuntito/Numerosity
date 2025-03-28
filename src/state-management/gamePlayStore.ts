import { create } from "zustand";
import CellModel from "../models/CellModel";
import GameState from "../models/GameState";
import GridDim from "../models/GridDim";
import useTimerStore from "./timerStore";
import generateQuestion from "../functions/generateQuestion";
import generateCellGrid from "../functions/generateCellGrid";
import placeNumbersInGrid from "../functions/placeNumbersInGrid";
import GameEndStatus from "../models/GameEndStatus";
import useAppStore from "./appStore";
import ScreenType from "../models/ScreenTypes";

interface GamePlayStore {
    state: GameState;
    startGame: (
        gridDim: GridDim,
        durationMillis: number,
        overlayDurationMillis: number
    ) => void;
    setQuestions: () => void;
    stopGame: () => void;
    onCellClick: (cell: CellModel) => void;
}

const defaultState = {} as GameState;

const useGamePlayStore = create<GamePlayStore>((set) => {
    const timerStore = useTimerStore.getState();

    const onTimeUp = () => {
        // set game end status to time up
        set((store) => {
            return {
                state: {
                    ...store.state,
                    endStatus: GameEndStatus.TimeUp,
                },
            };
        });
    };

    // after a question ends i.e. time up / answer correct
    // either state would be indicated by `state.gameEndStatus`
    // there should be a function that generates a new question

    const startGame = (
        gridDim: GridDim,
        durationMillis: number,
        totalQuestions: number
    ) => {
        timerStore.beginTimer(durationMillis, onTimeUp);

        const question = generateQuestion(gridDim);

        // place numbers on the grid
        const grid = generateCellGrid(gridDim);
        placeNumbersInGrid(grid, question.allNumbers);

        set((store) => {
            const qCount = 1;
            return {
                state: {
                    ...defaultState,
                    isStarted: true,
                    questionDetails: question,
                    gridDim: gridDim,
                    grid: grid,
                    currentSelections: [],
                    endStatus: undefined,
                    qCount: qCount,
                    totalQuestions: totalQuestions,
                    questionDurationMillis: durationMillis,
                    score: 0,
                    isLastQuestion: qCount === totalQuestions,
                },
            };
        });
    };

    const setQuestions = () => {
        set((store) => {
            if (!store.state.isStarted || store.state.isLastQuestion ) {
                return { state: store.state };
            }

            const { questionDurationMillis, gridDim } = store.state;

            // start timer
            timerStore.beginTimer(questionDurationMillis, onTimeUp);

            // get new question:
            const question = generateQuestion(gridDim);

            // place numbers on the grid
            const grid = generateCellGrid(gridDim);
            placeNumbersInGrid(grid, question.allNumbers);

            const qCount = store.state.qCount + 1;
            // set game state
            return {
                state: {
                    ...store.state,
                    questionDetails: question,
                    currentSelections: [],
                    grid: grid,
                    qCount: qCount,
                    endStatus: undefined,
                    isLastQuestion: qCount === store.state.totalQuestions
                },
            };
        });
    };

    const stopGame = () => {
        // stop timer
        // need to clean up the state but retain the score
        set((store) => {

            const appStore = useAppStore.getState();
            appStore.navigateTo(ScreenType.end);
            appStore.updateLastGameStat({
                questionCount: store.state.totalQuestions,
                score: store.state.score,
            });

            return {
                state: defaultState,
            };
        });
    };

    const onCellClick = (cell: CellModel) => {
        set((store) => {
            // if question is answered i.e. `endStatus` has a value,
            // no cell should be clickable
            if (store.state.endStatus) {
                return { state: store.state };
            }

            const { ri, ci } = cell.pos;

            const maxSelectableCells = 2;
            const currentSelections = [...store.state.currentSelections];

            // if cell already selected, remove from selections
            if (currentSelections.includes(cell)) {
                const idx = currentSelections.findIndex((cm) => cm === cell);
                currentSelections.splice(idx, 1);
            } else {
                // make room by removing last added cell
                if (currentSelections.length === maxSelectableCells) {
                    currentSelections.pop();
                }
                currentSelections.push(cell);
            }

            const correctSelections =
                store.state.questionDetails.correctSelections;
            if (checkForAnswer(currentSelections, correctSelections)) {
                timerStore.stopTimer();

                return {
                    state: {
                        ...store.state,
                        currentSelections: currentSelections,
                        endStatus: GameEndStatus.CorrectAnswer,
                        score: store.state.score + 1,
                    },
                };
            }

            return {
                state: {
                    ...store.state,
                    currentSelections: currentSelections,
                },
            };
        });
    };

    return {
        state: defaultState,
        startGame: startGame,
        setQuestions: setQuestions,
        stopGame: stopGame,
        onCellClick: onCellClick,
    };
});

export default useGamePlayStore;

const checkForAnswer = (
    currentSelectedCells: CellModel[],
    correctSelections: number[]
) => {
    const currSelections = currentSelectedCells.map((c) => c.num);

    currSelections.sort();
    correctSelections.sort();

    return currSelections.toString() === correctSelections.toString();
};