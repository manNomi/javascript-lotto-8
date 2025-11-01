import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGE } from '../constants/message.js';

const outputView = {
  printLottos(lottos) {
    Console.print(OUTPUT_MESSAGE.PURCHASE_COUNT(lottos.length));
    lottos.forEach((numbers) => {
      const sorted = [...numbers].sort((a, b) => a - b);
      Console.print(`[${sorted.join(', ')}]`);
    });
  },

  printResult(result) {
    Console.print(OUTPUT_MESSAGE.WINNING_STATISTICS);
    result.messages.forEach((message) => Console.print(message));
    Console.print(OUTPUT_MESSAGE.PROFIT_RATE(result.profitRate));
  },

  printError(message) {
    Console.print(message);
  },
};

export default outputView;
