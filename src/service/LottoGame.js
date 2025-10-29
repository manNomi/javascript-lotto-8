import { getRandomNumbers } from '../util/rand.js';
import Lotto from '../model/Lotto.js';

export default class LottoGame {
  #lottos = [];

  #purchaseAmount = 0;

  buyLotto(money) {
    this.#purchaseAmount = money;
    const count = money / 1000;

    this.#lottos = Array.from({ length: count }, () => {
      const numbers = getRandomNumbers(1, 45, 6);
      return new Lotto(numbers);
    });
  }

  get lottos() {
    return this.#lottos.map((lotto) => lotto.numbers);
  }

  calculateResult(winningNumbers, bonusNumber) {
    const matchResults = this.#lottos.map((lotto) =>
      this.#checkMatch(lotto, winningNumbers, bonusNumber),
    );

    const counts = this.#countMatchResults(matchResults);
    const statistics = this.#buildStatistics(counts);
    const totalPrize = this.#calculateTotalPrize(statistics);
    const profitRate = this.#calculateProfitRate(totalPrize);

    return {
      statistics,
      totalPrize,
      profitRate,
    };
  }

  #checkMatch(lotto, winningNumbers, bonusNumber) {
    const lottoNumbers = lotto.numbers;
    const matchCount = winningNumbers.filter((num) =>
      lottoNumbers.includes(num),
    ).length;
    const hasBonus = lottoNumbers.includes(bonusNumber);

    return { matchCount, hasBonus };
  }

  #countMatchResults(matchResults) {
    const counts = { first: 0, second: 0, third: 0, fourth: 0, fifth: 0 };

    matchResults.forEach(({ matchCount, hasBonus }) => {
      if (matchCount === 6) counts.first += 1;
      else if (matchCount === 5 && hasBonus) counts.second += 1;
      else if (matchCount === 5) counts.fifth += 1;
      else if (matchCount === 4) counts.fourth += 1;
      else if (matchCount === 3) counts.third += 1;
    });

    return counts;
  }

  #buildStatistics(counts) {
    return [
      {
        match: 3,
        prize: 5000,
        count: counts.third,
        message: '3개 일치 (5,000원)',
      },
      {
        match: 4,
        prize: 50000,
        count: counts.fourth,
        message: '4개 일치 (50,000원)',
      },
      {
        match: 5,
        prize: 1500000,
        count: counts.fifth,
        message: '5개 일치 (1,500,000원)',
      },
      {
        match: 5,
        bonus: true,
        prize: 30000000,
        count: counts.second,
        message: '5개 일치, 보너스 볼 일치 (30,000,000원)',
      },
      {
        match: 6,
        prize: 2000000000,
        count: counts.first,
        message: '6개 일치 (2,000,000,000원)',
      },
    ];
  }

  #calculateTotalPrize(statistics) {
    return statistics.reduce((sum, stat) => sum + stat.prize * stat.count, 0);
  }

  #calculateProfitRate(totalPrize) {
    return ((totalPrize / this.#purchaseAmount) * 100).toFixed(1);
  }
}
