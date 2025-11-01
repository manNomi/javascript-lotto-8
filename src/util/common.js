export const isEmpty = (value) => value.trim() === '';

export const isNumber = (value) => !Number.isNaN(value);

export const hasDuplicate = (array) => new Set(array).size !== array.length;

export const isInRange = (value, min, max) => value >= min && value <= max;

export const isAllInRange = (array, min, max) =>
  array.every((value) => isInRange(value, min, max));

export const hasLength = (array, length) => array.length === length;

export const isMultipleOf = (value, divisor) => value % divisor === 0;

export const includes = (array, value) => array.includes(value);

export const containsChar = (str, char) => str.includes(char);
