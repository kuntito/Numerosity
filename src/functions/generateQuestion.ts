import GridDim from "../models/GridDim";
import OperatorType, { getRandomOperator } from "../models/OperatorType";
import QuestionDetails, { emptyQuestion } from "../models/QuestionDetails";
import { getDetailsForOperand } from "./getDetailsForOperand";

const generateQuestion: (dim: GridDim) => QuestionDetails = (
    dim: GridDim
) => {
    const operator = getRandomOperator();
    // const operator = OperatorType.Addition;
    const numsNeeded = getNumsNeeded(dim);

    if (!numsNeeded) {
        return emptyQuestion;
    }
    const questionDetails = getDetailsForOperand(operator, numsNeeded);

    // FIXME to only display correct answers
    // if (questionDetails) {
    //     questionDetails.allNumbers = [...questionDetails.correctSelections];
    // }

    return questionDetails ? questionDetails : emptyQuestion;
};

export default generateQuestion;

const getNumsNeeded = (dim: GridDim): number | undefined => {
    const { rows, cols } = dim;

    const totalSlots = rows * cols;
    if (totalSlots <= 2) return undefined;

    return totalSlots;
};
