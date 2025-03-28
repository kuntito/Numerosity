import { shuffle } from "./shuffleArray";


function getArrayRange(a: number, b: number, randomize: boolean=false): number[] {
    const result: number[] = [];
    for (let i = a; i <= b; i++) {
        result.push(i);
    }

    if (randomize) {
        shuffle(result);
    }

    return result;
}

export default getArrayRange;