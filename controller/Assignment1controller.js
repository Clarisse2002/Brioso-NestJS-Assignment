const getFibonacciSequence = (num) => {
    if (isNaN(num) || num <= 0) {
        return { error: 'Invalid input. Please provide a positive integer.' };
    }

    const sequence = [0, 1];
    for (let i = 2; i < num; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }

    return { sequence: num === 1 ? [0] : sequence.slice(0, num) };
};

module.exports = { getFibonacciSequence };
