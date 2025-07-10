import { Parser } from 'json2csv';

/**
 * Converts an array of objects into a CSV string.
 * @param data - Array of objects to convert
 * @returns CSV string
 */
export function generateCSV(data: any[]): string {
  const parser = new Parser();
  return parser.parse(data);
}
