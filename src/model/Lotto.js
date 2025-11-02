import { ERROR_MESSAGE } from '../constants/message.js';
import CustomError from '../util/CustomError.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6)
      throw new CustomError(ERROR_MESSAGE.WINNING_NUMBERS.INVALID_LENGTH(6));
    if (numbers.some((num) => typeof num !== 'number' || Number.isNaN(num)))
      throw new CustomError(ERROR_MESSAGE.WINNING_NUMBERS.NOT_NUMBER);
    if (new Set(numbers).size !== numbers.length)
      throw new CustomError(ERROR_MESSAGE.WINNING_NUMBERS.DUPLICATE);
    if (numbers.some((num) => num < 1 || num > 45))
      throw new CustomError(ERROR_MESSAGE.WINNING_NUMBERS.OUT_OF_RANGE(1, 45));
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
