import { InputType, SizeSystemKeys } from '../types.js';
import { ringSizeData } from '../data/ringSizes.js';

export const findMatchingSize = (
  inputType,
  value
) => {
  if (value === null || value === undefined || String(value).trim() === '') {
    return null;
  }

  const normalizedValueStr = String(value).trim().toLowerCase();

  if (inputType === InputType.DIAMETER_MM || inputType === InputType.CIRCUMFERENCE_MM) {
    const numericValue = parseFloat(normalizedValueStr);
    if (isNaN(numericValue)) return null;
    
    const key = inputType === InputType.DIAMETER_MM ? 'diameter_mm' : 'circumference_mm';
    let closestMatch = null;
    let smallestDifference = Infinity;

    for (const entry of ringSizeData) {
      const difference = Math.abs(entry[key] - numericValue);
      if (difference < smallestDifference) {
        smallestDifference = difference;
        closestMatch = entry;
      }
      // Prioritize exact or very close matches to avoid large jumps if multiple are "close"
      if (difference < (key === 'diameter_mm' ? 0.05 : 0.25)) { // Tighter tolerance for "exact"
         return entry;
      }
    }
    // Define a reasonable threshold for "too far"
    // For diameter, a difference > 0.5mm might be too much (half a US size approx)
    // For circumference, a difference > 1.5mm might be too much
    if (key === 'diameter_mm' && smallestDifference > 0.6) return null; // Loosened slightly
    if (key === 'circumference_mm' && smallestDifference > 2.0) return null; // Loosened slightly

    return closestMatch;

  } else {
    const keyToCompare = SizeSystemKeys[inputType];
    if (!keyToCompare) return null;
    
    for (const entry of ringSizeData) {
      const entryValue = String(entry[keyToCompare]).trim().toLowerCase();
      if (entryValue === normalizedValueStr && entryValue !== "-") { // Ensure we don't match on placeholder "-"
        return entry;
      }
    }
  }
  return null;
};

export const getAvailableOptionsForInputType = (inputType) => {
  const key = SizeSystemKeys[inputType];
  if (!key || key === 'diameter_mm' || key === 'circumference_mm') {
    return []; // No predefined options for numeric inputs
  }

  const options = new Set();
  ringSizeData.forEach(entry => {
    const value = entry[key];
    // Ensure value is not null, undefined, and not the placeholder "-"
    if (value !== null && value !== undefined && String(value).trim() !== "-") {
      options.add(String(value));
    }
  });
  
  // Sort options: numeric first, then alphanumeric (like UK sizes "J½")
  return Array.from(options).sort((a, b) => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const isANum = !isNaN(numA) && /^\d+(\.\d+)?$/.test(a); // Check if 'a' is purely numeric string
    const isBNum = !isNaN(numB) && /^\d+(\.\d+)?$/.test(b); // Check if 'b' is purely numeric string

    if (isANum && isBNum) {
      return numA - numB;
    }
    if (isANum) { // Numbers come before non-numbers (like "J1/2")
      return -1;
    }
    if (isBNum) {
      return 1;
    }
    // For non-numeric or mixed strings (like "J½", "K"), use localeCompare
    // This handles simple letter sorting and letters with symbols reasonably well
    return a.localeCompare(b, undefined, { sensitivity: 'base' });
  });
};