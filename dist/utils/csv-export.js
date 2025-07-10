"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCSV = generateCSV;
const json2csv_1 = require("json2csv");
/**
 * Converts an array of objects into a CSV string.
 * @param data - Array of objects to convert
 * @returns CSV string
 */
function generateCSV(data) {
    const parser = new json2csv_1.Parser();
    return parser.parse(data);
}
