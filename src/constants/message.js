export const ERROR_MESSAGE = {
  PURCHASE: {
    EMPTY: '[ERROR] 구매 금액을 입력해주세요.',
    NOT_NUMBER: '[ERROR] 구매 금액은 숫자여야 합니다.',
    NOT_POSITIVE: '[ERROR] 구매 금액은 0원보다 커야 합니다.',
    NOT_1000_UNIT: '[ERROR] 구매 금액은 1,000원 단위여야 합니다.',
  },
  WINNING_NUMBERS: {
    EMPTY: '[ERROR] 당첨 번호를 입력해주세요.',
    CONTAINS_SPACE: '[ERROR] 공백은 입력할 수 없습니다.',
    INVALID_FORMAT: '[ERROR] 올바른 형식이 아닙니다. (예: 1,2,3,4,5,6)',
    INVALID_LENGTH: (count) => `[ERROR] 당첨 번호는 ${count}개여야 합니다.`,
    NOT_NUMBER: '[ERROR] 당첨 번호는 숫자만 입력 가능합니다.',
    DUPLICATE: '[ERROR] 당첨 번호는 중복될 수 없습니다.',
    OUT_OF_RANGE: (min, max) =>
      `[ERROR] 로또 번호는 ${min}부터 ${max} 사이의 숫자여야 합니다.`,
  },
  BONUS: {
    EMPTY: '[ERROR] 보너스 번호를 입력해주세요.',
    NOT_NUMBER: '[ERROR] 보너스 번호는 숫자여야 합니다.',
    OUT_OF_RANGE: (min, max) =>
      `[ERROR] 보너스 번호는 ${min}부터 ${max} 사이의 숫자여야 합니다.`,
    DUPLICATE_WITH_WINNING: '[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.',
  },
};

export const INPUT_MESSAGE = {
  ASK_PURCHASE_AMOUNT: '\n구입금액을 입력해 주세요.\n',
  ASK_WINNING_NUMBERS: '\n당첨 번호를 입력해 주세요.\n',
  ASK_BONUS_NUMBER: '\n보너스 번호를 입력해 주세요.\n',
};

export const OUTPUT_MESSAGE = {
  PURCHASE_COUNT: (count) => `\n${count}개를 구매했습니다.`,
  WINNING_STATISTICS: '\n당첨 통계\n---',
  PROFIT_RATE: (rate) => `총 수익률은 ${rate}%입니다.`,
};
