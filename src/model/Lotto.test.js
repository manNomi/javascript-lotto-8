import Lotto from './Lotto.js';

describe('로또 클래스 테스트', () => {
  test('로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow('[ERROR]');
  });

  // TODO: 테스트가 통과하도록 프로덕션 코드 구현
  test('로또 번호에 중복된 숫자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow('[ERROR]');
  });

  test.each([
    [0, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 46],
  ])('로또 번호가 1에서 45 범위를 벗어나면 예외가 발생한다.', (...numbers) => {
    expect(() => {
      new Lotto(numbers);
    }).toThrow('[ERROR]');
  });

  test.each([
    [1, 2, 3, NaN, 5, 6],
    [1, 2, 3, 'a', 5, 6],
    [1, 2, 3, '@', 5, 6],
  ])('로또 번호에 숫자가 아닌 값이 포함되면 예외가 발생한다.', (...numbers) => {
    expect(() => {
      new Lotto(numbers);
    }).toThrow('[ERROR]');
  });

  test('유효한 로또 번호가 입력되면 예외가 발생하지 않는다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6]);
    }).not.toThrow('[ERROR]');
  });
});
