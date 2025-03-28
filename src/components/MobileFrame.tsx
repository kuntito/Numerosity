import { Center, HStack, Text, VStack } from "@chakra-ui/react";

import StartScreen from "./screens/start/StartScreen";
import GamePlayScreen from "./screens/gameplay/GamePlayScreen";
import EndScreen from "./screens/EndScreen";
import useAppStore from "../state-management/appStore";
import ScreenType from "../models/ScreenTypes";
import EndGameButton from "./EndGameButton";
import EndGameDialog from "./EndGameDialog";
import { useState } from "react";
import useGamePlayStore from "../state-management/gamePlayStore";

const renderScreen = (screen: ScreenType) => {
    switch (screen) {
        case ScreenType.start:
            return <StartScreen />;
        case ScreenType.gamePlay:
            return <GamePlayScreen />;
        case ScreenType.end:
            return <EndScreen />;
        default:
            return <Text>nout!</Text>;
    }
};

const MobileFrame = () => {
    const { currScreen, displayCloseButton } = useAppStore((s) => s.state);
    const isGameInitialized = useAppStore((s) => s.state.isInitialized);
    const navigateTo = useAppStore((s) => s.navigateTo);

    const [showDialog, setShowDialog] = useState(false);
    const onCloseButtonClick = () => {
        if (currScreen === ScreenType.gamePlay) {
            setShowDialog(true);
        } else {
            navigateTo(ScreenType.start);
        }
    };

    const stopGame = useGamePlayStore((s) => s.stopGame);
    const { isStarted, qCount, totalQuestions } = useGamePlayStore(
        (s) => s.state
    );

    return isGameInitialized ? (
        <Center width="100vw" height="100vh" backgroundColor="palette.500">
            <VStack width="360px" height="640px" borderWidth={2}>
                {displayCloseButton && (
                    <HStack
                        width={"100%"}
                        justifyContent={"end"}
                        padding={"8px 4px 4px 30px"}
                        alignItems="center"
                    >
                        {isStarted && (
                            <Text
                                // fontFamily={"gluten"}
                                fontWeight={"medium"}
                                textAlign={"center"}
                                fontSize={"20px"}
                                width={"80%"}
                                color={"palette.300"}
                                opacity={0.5}
                                paddingTop={"2px"}
                            >
                                {qCount}/{totalQuestions}
                            </Text>
                        )}
                        <EndGameButton onClose={onCloseButtonClick} />
                    </HStack>
                )}
                <VStack
                    justifyContent="center"
                    gap="32px"
                    // up right down left
                    padding="16px 16px 0px 16px"
                    height={"100%"}
                    width={"100%"}
                >
                    {renderScreen(currScreen)}
                </VStack>
            </VStack>
            <EndGameDialog
                isVisible={showDialog}
                onConfirm={() => {
                    stopGame();
                    navigateTo(ScreenType.start);
                }}
                onCancel={() => {
                    setShowDialog(false);
                }}
            />
        </Center>
    ) : (
        <></>
    );
};

export default MobileFrame;
