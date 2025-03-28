import { Center, Text } from "@chakra-ui/react";

interface Props {
    text?: string;
    _bgColor?: string;
    _borderColor?: string;
    scaleText?: number;
}

export const NCard = ({ text, _bgColor, scaleText, _borderColor }: Props) => {
    const width = "100px";
    const height = "80px";
    const fontSize = "30px";
    const borderWidth = "4px";
    const borderColor = _borderColor ? _borderColor : "palette.100";
    const bgColor = _bgColor ? _bgColor : "";

    const scaledFontSize = scaleText
        ? `${parseFloat(fontSize) * scaleText}px`
        : fontSize;

    return (
        <Center
            width={width}
            height={height}
            fontSize={scaleText ? scaledFontSize : fontSize}
            fontWeight={"bold"}
            borderWidth={borderWidth}
            borderRadius="lg"
            borderColor={borderColor}
            bgColor={bgColor}
        >
            <Text>{text}</Text>
        </Center>
    );
};
