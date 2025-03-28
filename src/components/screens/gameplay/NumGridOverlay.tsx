import { Text, Image, VStack, TextProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GameEndStatus from "../../../models/GameEndStatus";
import useAppStore from "../../../state-management/appStore";
import useGamePlayStore from "../../../state-management/gamePlayStore";
import OverlayComp from "./OverlayComp";
import TimerIcon from "../../../assets/ic_timer.svg";
import CheckIcon from "../../../assets/ic_check.svg";

interface Props {
    beforeDismissOverlay: () => void;
    onGameOver: () => void;
}

const NumGridOverlay = ({ beforeDismissOverlay, onGameOver }: Props) => {
    const { endStatus, isLastQuestion } = useGamePlayStore((s) => s.state);

    const overlayDurationMillis = useAppStore(
        (s) => s.state.config.overlayDurationMillis
    );

    const [show, setShow] = useState(false);
    useEffect(() => {

        if (endStatus) {
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, overlayDurationMillis);

            // just before the overlay disappears
            setTimeout(() => {
                if (isLastQuestion) {
                    onGameOver();
                } else {
                    beforeDismissOverlay();
                }
            }, overlayDurationMillis * 0.8);
        }
    }, [endStatus]);

    const content = endStatus
        ? getContent(endStatus, isLastQuestion)
        : <></>;

    return show ? <OverlayComp>{content}</OverlayComp> : <></>;
};

export default NumGridOverlay;

const getContent = (
    gameEndStatus: GameEndStatus,
    isLastQuestion: boolean,
) => {
    if (gameEndStatus === GameEndStatus.CorrectAnswer) {
        return (
            <VStack>
                <Image src={CheckIcon} />
                {isLastQuestion && <OverlayText>game over!</OverlayText>}
            </VStack>
        );
    } else if (gameEndStatus === GameEndStatus.TimeUp) {
        return (
            <VStack>
                <Image src={TimerIcon} />
                <OverlayText>
                    {isLastQuestion ? "game over" : "time up!"}
                </OverlayText>
            </VStack>
        );
    } else {
    }
};

const OverlayText = (props: TextProps) => {
    return <Text fontSize={"30px"} fontWeight={"bold"} {...props} />;
};
