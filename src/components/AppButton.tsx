import { Button, ButtonProps } from "@chakra-ui/react";

const AppButton = (props: ButtonProps) => {
  return <Button borderRadius={100} {...props} />;
};

export default AppButton;