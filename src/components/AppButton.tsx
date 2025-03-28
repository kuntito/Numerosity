import { Button, ButtonProps } from "@chakra-ui/react";

const AppButton = (props: ButtonProps) => {
    return <Button color={"palette.300"} borderRadius={100} {...props} />;
};

export default AppButton;
