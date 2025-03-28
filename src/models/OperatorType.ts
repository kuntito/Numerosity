enum OperatorType {
    Addition = "+",
    Subtraction = "-",
    Division = "÷",
    Multiplication = "×",
}

export const getRandomOperator = (): OperatorType => {
    const operators = Object.values(OperatorType) as OperatorType[];
    return operators[Math.floor(Math.random() * operators.length)];
};


export default OperatorType;