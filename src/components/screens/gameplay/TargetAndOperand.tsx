import { HStack } from "@chakra-ui/react";
import useGamePlayStore from "../../../state-management/gamePlayStore";
import { NCard } from "./NCard";

const TargetAndOperand = () => {
    const { operator, targetNumber } = useGamePlayStore(
        (s) => s.state.questionDetails
    );

    return (
        <HStack gap={"16px"}>
            <NCard text={operator} scaleText={1.3} _borderColor="palette.300" />
            <NCard text={`${targetNumber}`} _bgColor={"palette.100"} />
        </HStack>
    );

};

export default TargetAndOperand;
