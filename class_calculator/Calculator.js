/**
 * @class
 * Representa una calculadora bàsica amb funcionalitat de memòria.
 */
class Calculator {

    // Matriu per emmagatzemar valors de memòria per a la calculadora.
    memory = [];

    constructor() {
    }

    /**
     * Suma dos números.
     * @param {number} number1 - El primer número.
     * @param {number} number2 - El segon número.
     * @returns {number} La suma dels dos números.
     */
    add(number1, number2) {
        number1 = Number.parseFloat(number1);
        number2 = Number.parseFloat(number2);

        if (Number.isNaN(number1)) {
            throw new TypeError("Tipus de dada no vàlid proporcionat per al primer argument.");
        } else if (Number.isNaN(number1)) {
            throw new TypeError("Tipus de dada no vàlid proporcionat per al segon argument.");
        } else {
            const result = number1 + number2;
            if (Number.isInteger(result)) {
                return result;
            } else {
                return result.toFixed(3);
            }
        }
    }

    /**
     * Resta el segon número del primer número.
     * @param {number} number1 - El primer número.
     * @param {number} number2 - El segon número.
     * @returns {number} El resultat de la resta.
     */
    substract(number1, number2) {
        number1 = Number.parseFloat(number1);
        number2 = Number.parseFloat(number2);

        if (Number.isNaN(number1)) {
            throw new TypeError("Tipus de dada no vàlid proporcionat.");
        } else if (Number.isNaN(number1)) {
            throw new TypeError("Tipus de dada no vàlid proporcionat.");
        } else {
            const result = number1 - number2;
            if (Number.isInteger(result)) {
                return result;
            } else {
                return result.toFixed(3);
            }
        }
    }

    /**
     * Realitza la divisió del primer número pel segon número.
     * @param {number} number1 - El dividend.
     * @param {number} number2 - El divisor.
     * @returns {number} El quocient de la divisió.
     * @throws {TypeError} Llença un error si els tipus de dades d'entrada no són vàlids.
     * @throws {Error} Llença un error si es fa un intent de dividir per zero.
     */
    divide(number1, number2) {
        number1 = Number.parseFloat(number1);
        number2 = Number.parseFloat(number2);

        if (Number.isNaN(number1)) {
            throw new TypeError("Tipus de dada no vàlid proporcionat.");
        } else if (Number.isNaN(number1)) {
            throw new TypeError("Tipus de dada no vàlid proporcionat.");
        } else if (number2 === 0) {
            throw new Error("La divisió per zero no està permesa.");
        } else {
            const result = number1 / number2;
            if (Number.isInteger(result)) {
                return result;
            } else {
                return result.toFixed(3);
            }
        }
    }

    /**
     * Multiplica dos números.
     * @param {number} number1 - El primer número.
     * @param {number} number2 - El segon número.
     * @returns {number} El producte dels dos números.
     */
    multiply(number1, number2) {
        number1 = Number.parseFloat(number1);
        number2 = Number.parseFloat(number2);

        if (Number.isNaN(number1)) {
            throw new TypeError("Tipus de dada no vàlid proporcionat.");
        } else if (Number.isNaN(number1)) {
            throw new TypeError("Tipus de dada no vàlid proporcionat.");
        } else {
            const result = number1 * number2;
            if (Number.isInteger(result)) {
                return result;
            } else {
                return result.toFixed(3);
            }
        }
    }

    /**
 * Recupera la matriu que conté totes les dades emmagatzemades.
 * @returns {Object} El missatge de confirmació.
 */
    saveData(newData) {
        this.memory.push(newData);
        return { content: "Dades desades." };
    }

    /**
     * Recupera la matriu que conté totes les dades emmagatzemades.
     * @returns {Array} La matriu de memòria.
     */
    getData() {
        if (this.memory.length === 0) {
            return { message: "La memòria està buida." };
        } else {
            return { content: JSON.stringify(this.memory) };
        }
    }
}

module.exports.Calculator = Calculator;