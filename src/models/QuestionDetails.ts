import OperatorType from "./OperatorType";

interface QuestionDetails {
    allNumbers: number[];
    targetNumber: number;
    correctSelections: number[];
    operator: OperatorType;
}

export const emptyQuestion = {
    allNumbers: [],
    correctSelections: [],
    operator: OperatorType.Addition,
    targetNumber: -1,
};

export default QuestionDetails;
