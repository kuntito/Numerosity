import React from "react";
import useTimerStore from "../../../../state-management/timerStore";
import ProgressBar from "./ProgressBar";

const MemoTimer = React.memo(() => {
    const { timeLeftMillis, durationMillis } = useTimerStore((s) => s.state);
    const fraction = timeLeftMillis / durationMillis;
    return <ProgressBar fraction={fraction} />;
});

export default MemoTimer;
