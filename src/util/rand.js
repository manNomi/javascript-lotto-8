import { MissionUtils } from '@woowacourse/mission-utils';

export const getRandomNumbers = (min, max, count) =>
  MissionUtils.Random.pickUniqueNumbersInRange(min, max, count);

export const getRandomNumber = (min, max) =>
  MissionUtils.Random.pickNumberInRange(min, max);
