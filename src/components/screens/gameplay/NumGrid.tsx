import { HStack, VStack } from "@chakra-ui/react";
import React from "react";
import useGamePlayStore from "../../../state-management/gamePlayStore";
import NumCell from "./NumCell";

const NumGrid = () => {
    const grid = useGamePlayStore((s) => s.state.grid);
    return (
        <VStack gap={0}>
            {grid.map((row, ri) => (
                <HStack gap={0} key={ri}>
                    {row.map((cellModel, ci) => (
                        <NumCell key={`${ri}-${ci}`} cell={cellModel} />
                    ))}
                </HStack>
            ))}
        </VStack>
    );
};

export default NumGrid;
