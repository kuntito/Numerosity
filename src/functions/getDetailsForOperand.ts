import OperatorType from "../models/OperatorType";
import QuestionDetails from "../models/QuestionDetails";
import getArrayRange from "./getArrayRange";
import getRandomNumber from "./getRandomNumber";

export const getDetailsForOperand = (
    op: OperatorType,
    numsNeeded: number
): QuestionDetails | undefined => {
    switch (op) {
        case OperatorType.Addition: {
            return getAdditionOperands(numsNeeded);
        }
        case OperatorType.Subtraction: {
            return getSubtractionOperands(numsNeeded);
        }
        case OperatorType.Multiplication: {
            return getMultiplicationOperands(numsNeeded);
        }
        case OperatorType.Division: {
            return getDivisionOperands(numsNeeded);
        }
        default: {
            return;
        }
    }
};

/**
 * Generates a set of numbers for an addition problem, ensuring that exactly two numbers
 * add up to a randomly selected target, and the remaining numbers do not interfere with
 * the target sum.
 *
 * @param numsNeeded - The total number of operands required (including the two numbers
 *                     that add up to the target).
 * @returns An object containing:
 *          - `num`: The target number (sum of the two main operands).
 *          - `operands`: The two numbers (`uno` and `dos`) that add up to the target.
 *          - `allNumbers`: The full list of numbers, including the two main operands
 *                          and additional random numbers that do not sum to the target.
 */
const getAdditionOperands = (numsNeeded: number): QuestionDetails => {
    const target = getRandomNumber(20, 100);

    const minFactor = 2;
    const uno = getRandomNumber(minFactor, target - minFactor);
    const dos = target - uno;

    numsNeeded -= 2;

    const correctSelections = [uno, dos];
    const avoid = new Set(correctSelections);

    const allNumbers = [...correctSelections];

    // rather than get a random number each time,
    // i retrieve an array a range and pop from it
    const pool = getArrayRange(minFactor, target - minFactor, true);

    while (allNumbers.length < numsNeeded && pool.length > 0) {
        const candidate = pool.pop()!;
        if (avoid.has(candidate)) continue;
        allNumbers.push(candidate);

        if (candidate < target) {
            const complement = target - candidate;
            avoid.add(complement);
        }
    }

    return {
        allNumbers: allNumbers,
        targetNumber: target,
        correctSelections: correctSelections,
        operator: OperatorType.Addition,
    };
};

const getSubtractionOperands = (numsNeeded: number): QuestionDetails => {
    const targetDiff = getRandomNumber(1, 5);

    const maxNumber = 100;
    const pool = getArrayRange(1, maxNumber - targetDiff + 1, true);

    const smallNum = pool.pop()!;
    const bigNum = smallNum + targetDiff;

    const operands = [smallNum, bigNum];
    const toAvoid = new Set(operands);

    const allNumbers = [...operands];
    while (allNumbers.length < numsNeeded && pool.length > 0) {
        const cand = pool.pop()!;
        const absOne = cand - targetDiff;
        const absTwo = cand + targetDiff;
        if (toAvoid.has(cand) || toAvoid.has(absOne) || toAvoid.has(absTwo)) {
            continue;
        }

        allNumbers.push(cand);
        toAvoid.add(absOne);
        toAvoid.add(absTwo);
    }

    return {
        allNumbers: allNumbers,
        targetNumber: targetDiff,
        correctSelections: operands,
        operator: OperatorType.Subtraction,
    };
};

const getDivisionOperands = (numsNeeded: number): QuestionDetails => {
    const target = getRandomNumber(2, 10);

    const smallNumber = getRandomNumber(2, 10);
    const bigNumber = smallNumber * target;

    const pool = getArrayRange(2, 100, true);
    const operands = [smallNumber, bigNumber];

    const toAvoid = new Set(operands);
    const allNumbers = [...operands];

    while (allNumbers.length < numsNeeded && pool.length > 0) {
        const cand = pool.pop()!;
        const high = cand * target;
        const low = cand / target;

        if (toAvoid.has(cand) || toAvoid.has(high) || toAvoid.has(low)) {
            continue;
        }

        allNumbers.push(cand);
        toAvoid.add(high);
        toAvoid.add(low);
    }

    return {
        targetNumber: target,
        correctSelections: operands,
        allNumbers: allNumbers,
        operator: OperatorType.Division,
    };
};

const getMultiplicationOperands = (numsNeeded: number): QuestionDetails => {
    const maxNum = 100;
    const numOne = getRandomNumber(2, 50);

    const numTwo = getRandomNumber(2, Math.floor(maxNum / numOne));
    const target = numOne * numTwo;

    const operands = [numOne, numTwo];
    const toAvoid = new Set(operands);
    const allNumbers = [...operands];

    const pool = getArrayRange(2, 100, true);
    while (allNumbers.length < numsNeeded && pool.length > 0) {
        const cand = pool.pop()!;
        const multiplier = target % cand ? null : target / cand;

        if (toAvoid.has(cand)) continue;
        if (multiplier && toAvoid.has(multiplier)) continue;

        if (multiplier) {
            toAvoid.add(multiplier);
        }
        allNumbers.push(cand);
    }

    return {
        targetNumber: target,
        correctSelections: operands,
        allNumbers: allNumbers,
        operator: OperatorType.Multiplication,
    };
};
