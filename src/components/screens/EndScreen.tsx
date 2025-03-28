import { Button, Text, VStack } from "@chakra-ui/react";
import ScreenType from "../../models/ScreenTypes";
import useAppStore from "../../state-management/appStore";
import AppButton from "../AppButton";

const EndScreen = () => {
    const prevGameStat = useAppStore((s) => s.state.prevGameStat);
    if (!prevGameStat) {
        return placeHolder();
    }
    const navigateTo = useAppStore((s) => s.navigateTo);

    const { questionCount, score } = prevGameStat;
    return (
        <>
            <VStack gap={0}>
                <Text
                    fontSize={"40px"}
                    fontWeight={"bold"}
                    textDecoration={"underline"}
                >
                    score
                </Text>
                <Text
                    fontSize={"30px"}
                    fontWeight={"bold"}
                    color={"palette.highlight"}
                >{`${score}/${questionCount}`}</Text>
            </VStack>
            <AppButton
                background="palette.100"
                borderRadius={100}
                onClick={() => {
                    navigateTo(ScreenType.gamePlay);
                }}
            >
                replay?
            </AppButton>
        </>
    );
};

export default EndScreen;

const placeHolder = () => {
    const navigateTo = useAppStore((s) => s.navigateTo);
    return (
        <>
            <Text>nothing to see here</Text>
            <Button
                background="palette.100"
                onClick={() => {
                    navigateTo(ScreenType.start);
                }}
            >
                go to start
            </Button>
        </>
    );
};
