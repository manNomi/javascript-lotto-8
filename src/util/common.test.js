import {
  isEmpty,
  isNumber,
  hasDuplicate,
  isInRange,
  isAllInRange,
  hasLength,
  isMultipleOf,
  includes,
  containsChar,
} from './common.js';

describe('Common Utils', () => {
  describe('isEmpty', () => {
    test('빈 문자열이면 true', () => {
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('   ')).toBe(true);
    });

    test('값이 있으면 false', () => {
      expect(isEmpty('abc')).toBe(false);
      expect(isEmpty('123')).toBe(false);
    });
  });

  describe('isNumber', () => {
    test('숫자로 변환 가능하면 true', () => {
      expect(isNumber('123')).toBe(true);
      expect(isNumber('0')).toBe(true);
      expect(isNumber('-10')).toBe(true);
    });

    test('숫자로 변환 불가능하면 false', () => {
      expect(isNumber('abc')).toBe(false);
      expect(isNumber('12a')).toBe(false);
    });
  });

  describe('hasDuplicate', () => {
    test('중복이 있으면 true', () => {
      expect(hasDuplicate([1, 2, 3, 3])).toBe(true);
      expect(hasDuplicate([1, 1, 2, 3])).toBe(true);
    });

    test('중복이 없으면 false', () => {
      expect(hasDuplicate([1, 2, 3, 4])).toBe(false);
      expect(hasDuplicate([5, 6, 7])).toBe(false);
    });
  });

  describe('isInRange', () => {
    test('범위 내에 있으면 true', () => {
      expect(isInRange(5, 1, 10)).toBe(true);
      expect(isInRange(1, 1, 10)).toBe(true);
      expect(isInRange(10, 1, 10)).toBe(true);
    });

    test('범위 밖이면 false', () => {
      expect(isInRange(0, 1, 10)).toBe(false);
      expect(isInRange(11, 1, 10)).toBe(false);
    });
  });

  describe('isAllInRange', () => {
    test('모든 값이 범위 내에 있으면 true', () => {
      expect(isAllInRange([1, 2, 3, 4, 5], 1, 10)).toBe(true);
    });

    test('하나라도 범위 밖이면 false', () => {
      expect(isAllInRange([1, 2, 11], 1, 10)).toBe(false);
      expect(isAllInRange([0, 1, 2], 1, 10)).toBe(false);
    });
  });

  describe('hasLength', () => {
    test('길이가 같으면 true', () => {
      expect(hasLength([1, 2, 3], 3)).toBe(true);
      expect(hasLength([], 0)).toBe(true);
    });

    test('길이가 다르면 false', () => {
      expect(hasLength([1, 2, 3], 4)).toBe(false);
      expect(hasLength([1, 2], 3)).toBe(false);
    });
  });

  describe('isMultipleOf', () => {
    test('배수이면 true', () => {
      expect(isMultipleOf(1000, 1000)).toBe(true);
      expect(isMultipleOf(5000, 1000)).toBe(true);
    });

    test('배수가 아니면 false', () => {
      expect(isMultipleOf(1500, 1000)).toBe(false);
      expect(isMultipleOf(999, 1000)).toBe(false);
    });
  });

  describe('includes', () => {
    test('포함되어 있으면 true', () => {
      expect(includes([1, 2, 3], 2)).toBe(true);
    });

    test('포함되어 있지 않으면 false', () => {
      expect(includes([1, 2, 3], 4)).toBe(false);
    });
  });

  describe('containsChar', () => {
    test('문자가 포함되어 있으면 true', () => {
      expect(containsChar('1,2,3', ',')).toBe(true);
      expect(containsChar('hello world', ' ')).toBe(true);
    });

    test('문자가 포함되어 있지 않으면 false', () => {
      expect(containsChar('123', ',')).toBe(false);
    });
  });
});
