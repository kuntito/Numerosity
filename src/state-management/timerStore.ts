import ms from "ms";
import { create } from "zustand";

interface TimerState {
    durationMillis: number;
    timeLeftMillis: number;
    isTimeUp: boolean;
}

interface TimerStore {
    state: TimerState;
    beginTimer: (durationMillis: number, onTimeUp?: () => void) => void;
    stopTimer: () => void;
}

const defaultState = {
    durationMillis: 0,
    timeLeftMillis: 0,
    isTimeUp: false,
} as TimerState;

const oneSecondMillis = ms("1s");
const useTimerStore = create<TimerStore>((set) => {
    let intervalId: number | null = null;

    const removeTimerInterval = () => {
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
    };

    return {
        state: defaultState,
        beginTimer: (durationMillis: number, onTimeUp?: () => void) => {
            // clear existing timer before starting a new one
            removeTimerInterval();

            // starting a new timer
            set((store) => {
                return {
                    state: {
                        ...store.state,
                        timeLeftMillis: durationMillis,
                        durationMillis: durationMillis,
                    },
                };
            });

            // setting up the interval to run every second
            intervalId = setInterval(() => {
                // start the set store here
                set((store) => {
                    const newTimeLeftMillis =
                        store.state.timeLeftMillis - oneSecondMillis;

                    if (newTimeLeftMillis < 0) {
                        removeTimerInterval();
                        if (onTimeUp) onTimeUp();
                        return {
                            state: {
                                ...defaultState,
                                isTimeUp: true,
                            },
                        };
                    }

                    // otherwise, update the time left
                    return {
                        state: {
                            ...store.state,
                            timeLeftMillis: newTimeLeftMillis,
                        },
                    };
                });
            }, oneSecondMillis);
        },
        stopTimer: () => {
            removeTimerInterval();
            set({ state: defaultState });
        },
    };
});

export default useTimerStore;
