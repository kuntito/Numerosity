const interval = setInterval(() => {
    set((store) => {
        const newTimeLeft = store.state.timeLeft - 1000;
        if (newTimeLeft <= 0) {
            clearInterval(interval);
            return {
                state: {
                    timeLeft: 0,
                    isRunning: false,
                },
            };
        }
        return {
            state: {
                timeLeft: newTimeLeft,
                isRunning: true,
            },
        };
    });
}, 1000);
