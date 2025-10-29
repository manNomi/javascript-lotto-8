import LottoGame from './LottoGame.js';
import { mockRandoms } from '../../__tests__/mockTest.test.js';

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

      expect(result.totalPrize).toBe(0);
      expect(result.profitRate).toBe('0.0');
    });

    test('2등 당첨 - 5개 + 보너스', () => {
      mockRandoms([[1, 2, 3, 4, 5, 7]]);

      game.buyLotto(1000);
      const result = game.calculateResult([1, 2, 3, 4, 5, 6], 7);

      expect(result.statistics[3].count).toBe(1); // 2등
      expect(result.totalPrize).toBe(30000000);
    });

    test('1등 당첨', () => {
      mockRandoms([[1, 2, 3, 4, 5, 6]]);

      game.buyLotto(1000);
      const result = game.calculateResult([1, 2, 3, 4, 5, 6], 7);

      expect(result.statistics[4].count).toBe(1);
      expect(result.totalPrize).toBe(2000000000);
    });

    test('여러 장 구매 - 복합 당첨', () => {
      mockRandoms([
        [1, 2, 3, 4, 5, 6], // 1등
        [1, 2, 3, 10, 11, 12], // 3개 일치
        [7, 8, 9, 10, 11, 12], // 꽝
      ]);

      game.buyLotto(3000);
      const result = game.calculateResult([1, 2, 3, 4, 5, 6], 7);

      expect(result.statistics[0].count).toBe(1); // 3개 일치 1개
      expect(result.statistics[4].count).toBe(1); // 1등 1개
      expect(result.totalPrize).toBe(2000005000);
    });

    test('수익률 계산', () => {
      mockRandoms([
        [1, 2, 3, 10, 11, 12], // 5000원
        [7, 8, 9, 10, 11, 12], // 0원
      ]);

      game.buyLotto(2000);
      const result = game.calculateResult([1, 2, 3, 4, 5, 6], 7);

      expect(result.purchaseAmount).toBe(2000);
      expect(result.profitRate).toBe('250.0'); // 5000 / 2000 * 100
    });

    test('반환 데이터 구조 검증', () => {
      mockRandoms([[1, 2, 3, 10, 11, 12]]);

      game.buyLotto(1000);
      const result = game.calculateResult([1, 2, 3, 4, 5, 6], 7);

      expect(result).toHaveProperty('statistics');
      expect(result).toHaveProperty('totalPrize');
      expect(result).toHaveProperty('purchaseAmount');
      expect(result).toHaveProperty('profitRate');
      expect(result.statistics).toHaveLength(5);
    });
  });
});
