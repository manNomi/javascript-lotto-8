class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    this.#validateType(numbers);
    this.#validateLength(numbers);
    this.#validateDuplicate(numbers);
    this.#validateRange(numbers);
  }

  #validateType(numbers) {
    if (!Array.isArray(numbers)) {
      throw new Error('[ERROR] 로또 번호는 배열이어야 합니다.');
    }

    if (numbers.some((num) => typeof num !== 'number' || Number.isNaN(num))) {
      throw new Error('[ERROR] 로또 번호는 숫자만 가능합니다.');
    }
  }

  #validateLength(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
  }

  #validateDuplicate(numbers) {
    if (new Set(numbers).size !== numbers.length) {
      throw new Error('[ERROR] 로또 번호는 중복될 수 없습니다.');
    }
  }

  #validateRange(numbers) {
    if (numbers.some((num) => num < 1 || num > 45)) {
      throw new Error('[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.');
    }
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
