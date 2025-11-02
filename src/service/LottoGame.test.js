import LottoGame from './LottoGame.js';
import { mockRandoms } from '../../test/mockUtils.js';

describe('LottoGame', () => {
  let game;

  beforeEach(() => {
    game = new LottoGame();
    jest.restoreAllMocks();
  });

  describe('calculateResult', () => {
    test('꽝 입니다만 ', () => {
      mockRandoms([[10, 20, 30, 40, 41, 42]]);

      game.buyLotto(1000);
      const result = game.calculateResult([1, 2, 3, 4, 5, 6], 7);

      expect(result.profitRate).toBe('0.0');
      expect(result.messages).toHaveLength(5);
    });

    test('2등 당첨 - 5개 + 보너스', () => {
      mockRandoms([[1, 2, 3, 4, 5, 7]]);

      game.buyLotto(1000);
      const result = game.calculateResult([1, 2, 3, 4, 5, 6], 7);

      expect(result.messages[3]).toContain('5개 일치, 보너스 볼 일치');
      expect(result.messages[3]).toContain('1개');
    });

    test('1등 당첨', () => {
      mockRandoms([[1, 2, 3, 4, 5, 6]]);

      game.buyLotto(1000);
      const result = game.calculateResult([1, 2, 3, 4, 5, 6], 7);

      expect(result.messages[4]).toContain('6개 일치');
      expect(result.messages[4]).toContain('1개');
    });

    test('여러 장 구매 - 복합 당첨', () => {
      mockRandoms([
        [1, 2, 3, 4, 5, 6], // 1등
        [1, 2, 3, 10, 11, 12], // 3개 일치
        [7, 8, 9, 10, 11, 12], // 꽝
      ]);

      game.buyLotto(3000);
      const result = game.calculateResult([1, 2, 3, 4, 5, 6], 7);

      expect(result.messages[0]).toContain('1개'); // 3개 일치 1개
      expect(result.messages[4]).toContain('1개'); // 1등 1개
    });

    test('수익률 계산', () => {
      mockRandoms([
        [1, 2, 3, 10, 11, 12], // 5000원
        [7, 8, 9, 10, 11, 12], // 0원
      ]);

      game.buyLotto(2000);
      const result = game.calculateResult([1, 2, 3, 4, 5, 6], 7);

      expect(result.profitRate).toBe('250.0'); // 5000 / 2000 * 100
    });

    test('반환 데이터 구조 검증', () => {
      mockRandoms([[1, 2, 3, 10, 11, 12]]);

      game.buyLotto(1000);
      const result = game.calculateResult([1, 2, 3, 4, 5, 6], 7);

      expect(result).toHaveProperty('messages');
      expect(result).toHaveProperty('profitRate');
      expect(result.messages).toHaveLength(5);
      expect(typeof result.messages[0]).toBe('string');
    });
  });
});
