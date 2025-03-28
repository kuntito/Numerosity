import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const OverlayComp = ({ children }: Props) => {
    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            backgroundColor="rgba(0, 0, 0, 0.75)" // Semi-transparent background
            display="flex"
            justifyContent="center"
            alignItems="center"
            zIndex="1000" // Ensure it's on top
        >
            {children}
        </Box>
    );
};

export default OverlayComp;
