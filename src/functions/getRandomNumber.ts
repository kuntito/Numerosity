const getRandomNumber = (lowerLimit: number, upperLimit: number) => {
    // Generates a random decimal number between 0 (inclusive) and 1 (exclusive).
    const seed = Math.random();
    const temp = seed * (upperLimit - lowerLimit + 1) + lowerLimit;
    const randomNumber = Math.floor(temp);
    return randomNumber;
};

export default getRandomNumber;