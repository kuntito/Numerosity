import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    HStack,
    Text,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import useGamePlayStore from "../state-management/gamePlayStore";

interface Props {
    isVisible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const EndGameDialog = ({ isVisible, onConfirm, onCancel }: Props) => {
    const cancelRef = useRef<HTMLButtonElement>(null);

    return (
        <AlertDialog
            motionPreset="scale"
            leastDestructiveRef={cancelRef}
            isOpen={isVisible}
            onClose={onCancel}
            size={"sm"}
            isCentered
        >
            <AlertDialogOverlay />

            <AlertDialogContent
                w={"240px"}
                borderRadius={"16px"}
                background={"palette.100"}
            >
                <AlertDialogCloseButton />
                <AlertDialogHeader>
                    <Text
                        align={"center"}
                        fontWeight={"bold"}
                        fontSize={"30px"}
                    >
                        quit?
                    </Text>
                </AlertDialogHeader>
                <AlertDialogBody>
                    <Text
                        align={"center"}
                        color={"palette.highlight"}
                        fontSize={"20px"}
                    >
                        progress will be lost
                    </Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <HStack width={"100%"} justifyContent={"center"}>
                        <Button
                            variant="outline"
                            color="palette.400"
                            borderColor="palette.400"
                            borderRadius="full"
                            px={6}
                            onClick={() => {
                                onConfirm();
                                onCancel();
                            }}
                        >
                            yes
                        </Button>

                        <Button
                            bg="palette.300"
                            color="palette.100"
                            borderRadius="full"
                            px={6}
                            onClick={onCancel}
                        >
                            no
                        </Button>
                    </HStack>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default EndGameDialog;
