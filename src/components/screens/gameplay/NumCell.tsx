import { Center, Text } from "@chakra-ui/react";
import CellModel from "../../../models/CellModel";
import useGamePlayStore from "../../../state-management/gamePlayStore";

interface Props {
    cell: CellModel;
}

const NumCell = ({ cell }: Props) => {
    const cellSize = "100px";

    const { onCellClick } = useGamePlayStore();
    const currentSelections = useGamePlayStore(
        (s) => s.state.currentSelections
    );

    const isActive = currentSelections.includes(cell);
    const bgColor = isActive ? "palette.highlight" : "palette.300";
    const fontSize = "20px";

    return (
        <Center
            boxSize={"95px"}
            // borderWidth={2}
        >
            {cell.num ? (
                <Center
                    boxSize={"75px"}
                    onClick={() => onCellClick(cell)}
                    borderRadius="100%"
                    cursor="pointer"
                    backgroundColor={bgColor}
                    style={{
                        transform: isActive ? "scale(1.15)" : "scale(1)",
                        transition: "transform 0.1s ease-in-out",
                        boxShadow: isActive
                            ? "0 4px 8px rgba(234, 11, 11, 0.2)"
                            : "none",
                    }}
                >
                    <Center
                        boxSize="65px"
                        borderRadius="100%"
                        backgroundColor="palette.100"
                    >
                        <Text fontWeight="bold" fontSize={fontSize}>
                            {cell?.num}
                        </Text>
                    </Center>
                </Center>
            ) : (
                ""
            )}
        </Center>
    );
};

export default NumCell;
