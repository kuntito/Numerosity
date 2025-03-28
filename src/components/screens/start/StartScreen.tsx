import { Button } from "@chakra-ui/react";
import useAppStore from "../../../state-management/appStore";
import ScreenType from "../../../models/ScreenTypes";
import AppButton from "../../AppButton";

const StartScreen = () => {
    const navigateTo = useAppStore((s) => s.navigateTo);
    return (
        <AppButton
            background="palette.100"
            onClick={() => {
                navigateTo(ScreenType.gamePlay);
            }}
        >
            start game
        </AppButton>
    );
};

export default StartScreen;
