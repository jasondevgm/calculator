/**
 * @class
 * Represents a basic calculator with memory functionality.
 */
class Calculator {

    // Array to store memory values for the calculator.
    memory = [];

    constructor() {
    }

    /**
     * Adds two numbers.
     * @param {number} number1 - The first number.
     * @param {number} number2 - The second number.
     * @returns {number} The sum of the two numbers.
     */
    add(number1, number2) {
        if (!number1 || Number.isNaN(number1)) {
            throw new TypeError("Invalid data type provided.");
        } else if (!number2 || Number.isNaN(number1)) {
            throw new TypeError("Invalid data type provided.");
        } else {
            return number1 + number2;
        }
    }

    /**
     * Subtracts the second number from the first number.
     * @param {number} number1 - The first number.
     * @param {number} number2 - The second number.
     * @returns {number} The result of the subtraction.
     */
    substract(number1, number2) {
        if (!number1 || Number.isNaN(number1)) {
            throw new TypeError("Invalid data type provided.");
        } else if (!number2 || Number.isNaN(number1)) {
            throw new TypeError("Invalid data type provided.");
        } else {
            return number1 - number2;
        }
    }

    /**
     * Performs division of the first number by the second number.
     * @param {number} number1 - The dividend.
     * @param {number} number2 - The divisor.
     * @returns {number} The quotient of the division.
     * @throws {TypeError} Throws an error if the input data types are invalid.
     * @throws {Error} Throws an error if an attempt is made to divide by zero.
     */
    divide(number1, number2) {
        if (!number1 || Number.isNaN(number1)) {
            throw new TypeError("Invalid data type provided.");
        } else if (!number2 || Number.isNaN(number1)) {
            throw new TypeError("Invalid data type provided.");
        } else if (number2 === 0) {
            throw new Error("Division by zero is not allowed.");
        } else {
            return number1 / number2;
        }
    }

    /**
     * Multiplies two numbers.
     * @param {number} number1 - The first number.
     * @param {number} number2 - The second number.
     * @returns {number} The product of the two numbers.
     */
    multiply(number1, number2) {
        if (!number1 || Number.isNaN(number1)) {
            throw new TypeError("Invalid data type provided.");
        } else if (!number2 || Number.isNaN(number1)) {
            throw new TypeError("Invalid data type provided.");
        } else {
            return number1 * number2;
        }
    }
}

module.exports.Calculator = Calculator;