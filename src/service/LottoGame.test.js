import LottoGame from './LottoGame.js';

describe('LottoGame', () => {
  test('유효한 로또 번호가 입력되면 예외가 발생하지 않는다.', () => {
    expect(() => {
      new LottoGame([1, 2, 3, 4, 5, 6]);
    }).not.toThrow('[ERROR]');
  });
});
