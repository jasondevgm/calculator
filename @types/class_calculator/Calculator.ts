/**
 * Represents a basic calculator with memory functionality.
 */
declare class Calculator {
    /**
     * Array to store memory values for the calculator.
     */
    memory: any[];

    constructor();

    /**
     * Adds two numbers.
     * @param number1 - The first number.
     * @param number2 - The second number.
     * @returns The sum of the two numbers.
     * @throws {TypeError} Throws an error if the input data types are invalid.
     */
    add(number1: number, number2: number): number;

    /**
     * Subtracts the second number from the first number.
     * @param number1 - The first number.
     * @param number2 - The second number.
     * @returns The result of the subtraction.
     * @throws {TypeError} Throws an error if the input data types are invalid.
     */
    subtract(number1: number, number2: number): number;

    /**
     * Performs division of the first number by the second number.
     * @param number1 - The dividend.
     * @param number2 - The divisor.
     * @returns The quotient of the division.
     * @throws {TypeError} Throws an error if the input data types are invalid.
     * @throws {Error} Throws an error if an attempt is made to divide by zero.
     */
    divide(number1: number, number2: number): number;

    /**
     * Multiplies two numbers.
     * @param number1 - The first number.
     * @param number2 - The second number.
     * @returns The product of the two numbers.
     * @throws {TypeError} Throws an error if the input data types are invalid.
     */
    multiply(number1: number, number2: number): number;
}

export { Calculator };