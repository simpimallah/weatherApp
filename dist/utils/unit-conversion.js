"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.celsiusToFahrenheit = celsiusToFahrenheit;
exports.fahrenheitToCelsius = fahrenheitToCelsius;
exports.kmToMiles = kmToMiles;
exports.milesToKm = milesToKm;
/**
 * Convert Celsius to Fahrenheit
 */
function celsiusToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
}
/**
 * Convert Fahrenheit to Celsius
 */
function fahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
}
/**
 * Convert kilometers to miles
 */
function kmToMiles(km) {
    return km * 0.621371;
}
/**
 * Convert miles to kilometers
 */
function milesToKm(miles) {
    return miles / 0.621371;
}
