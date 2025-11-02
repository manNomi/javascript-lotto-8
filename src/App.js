import LottoGame from './service/LottoGame.js';
import inputView from './view/InputView.js';
import outputView from './view/OutputView.js';
import { INPUT_MESSAGE, ERROR_MESSAGE } from './constants/message.js';
import {
  isEmpty,
  isNumber,
  isMultipleOf,
  hasDuplicate,
  isInRange,
  isAllInRange,
  hasLength,
  containsChar,
  includes,
} from './util/common.js';

class App {
  async run() {
    const purchaseAmount = await this.#getPurchaseAmount();
    const lottoGame = await this.#purchaseLottos(purchaseAmount);

    const { winningNumbers, bonusNumber } = await this.#getWinningInfo();

    const result = lottoGame.calculateResult(winningNumbers, bonusNumber);

    outputView.printResult(result);
  }

  async #getPurchaseAmount() {
    const purchaseInput = await inputView.readLineMessage(
      INPUT_MESSAGE.ASK_PURCHASE_AMOUNT,
    );
    return this.#validatePurchaseAmount(purchaseInput);
  }

  async #purchaseLottos(purchaseAmount) {
    const lottoGame = new LottoGame();
    lottoGame.buyLotto(purchaseAmount);
    outputView.printLottos(lottoGame.lottos);
    return lottoGame;
  }

  async #getWinningInfo() {
    const winningInput = await inputView.readLineMessage(
      INPUT_MESSAGE.ASK_WINNING_NUMBERS,
    );
    const winningNumbers = this.#validateWinningNumbers(winningInput);

    const bonusInput = await inputView.readLineMessage(
      INPUT_MESSAGE.ASK_BONUS_NUMBER,
    );
    const bonusNumber = this.#validateBonusNumber(bonusInput, winningNumbers);

    return { winningNumbers, bonusNumber };
  }

  #validatePurchaseAmount(input) {
    if (isEmpty(input)) throw new Error(ERROR_MESSAGE.PURCHASE.EMPTY);

    const trimmed = input.trim();
    if (!isNumber(trimmed)) throw new Error(ERROR_MESSAGE.PURCHASE.NOT_NUMBER);

    const amount = Number(trimmed);
    if (amount <= 0) throw new Error(ERROR_MESSAGE.PURCHASE.NOT_POSITIVE);
    if (!isMultipleOf(amount, 1000))
      throw new Error(ERROR_MESSAGE.PURCHASE.NOT_1000_UNIT);

    return amount;
  }

  #validateWinningNumbers(input) {
    if (isEmpty(input)) throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.EMPTY);

    const trimmed = input.trim();
    this.#validateWinningFormat(trimmed);

    const parts = trimmed.split(',');
    if (!hasLength(parts, 6))
      throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.INVALID_LENGTH(6));

    const numbers = this.#parseWinningNumbers(parts);
    this.#validateWinningNumbersRules(numbers);

    return numbers;
  }

  #validateWinningFormat(trimmed) {
    if (containsChar(trimmed, ' '))
      throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.CONTAINS_SPACE);
    if (containsChar(trimmed, ',,'))
      throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.INVALID_FORMAT);
  }

  #parseWinningNumbers(parts) {
    return parts.map((part) => {
      const num = Number(part.trim());
      if (!isNumber(num))
        throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.NOT_NUMBER);
      return num;
    });
  }

  #validateWinningNumbersRules(numbers) {
    if (hasDuplicate(numbers))
      throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.DUPLICATE);
    if (!isAllInRange(numbers, 1, 45))
      throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.OUT_OF_RANGE(1, 45));
  }

  #validateBonusNumber(input, winningNumbers) {
    if (isEmpty(input)) throw new Error(ERROR_MESSAGE.BONUS.EMPTY);

    const trimmed = input.trim();
    if (!isNumber(trimmed)) throw new Error(ERROR_MESSAGE.BONUS.NOT_NUMBER);

    const bonusNumber = Number(trimmed);
    if (!isInRange(bonusNumber, 1, 45))
      throw new Error(ERROR_MESSAGE.BONUS.OUT_OF_RANGE(1, 45));
    if (includes(winningNumbers, bonusNumber))
      throw new Error(ERROR_MESSAGE.BONUS.DUPLICATE_WITH_WINNING);

    return bonusNumber;
  }
}

export default App;
