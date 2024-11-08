function getFactorial(number) {
    if (isNaN(number) || number < 0) {
        return { error: 'Invalid input. Please provide a non-negative integer.' };
    }
    let factorial = 1;
    for (let i = 1; i <= number; i++) {
        factorial *= i;
    }
    return { factorial: factorial };
}
module.exports = { getFactorial };
