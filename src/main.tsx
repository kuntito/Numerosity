import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
    palette: {
        100: "#060631",
        300: "#FFFFFF",
        400: "#90E0EF",
        500: "#598392",
        highlight: "#E4FFAA",
    },
};

const theme = extendTheme({
    colors,
    components: {
        Text: {
            baseStyle: {
                color: "palette.300",
            },
        },
        Progress: {
            baseStyle: {
                filledTrack: {
                    bg: "palette.100",
                },
                track: {
                    bg: "palette.400",
                },
            },
        },
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </React.StrictMode>
);
