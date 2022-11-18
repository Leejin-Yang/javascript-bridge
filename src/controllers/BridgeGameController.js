const { Console } = require('@woowacourse/mission-utils');

const { GAME_RULE } = require('../constants');
const BridgeGame = require('../models/BridgeGame');
const InputValidator = require('../utils/InputValidator');
const InputView = require('../views/InputView');
const OutputView = require('../views/OutputView');

class BridgeGameController {
  #game = new BridgeGame();

  play() {
    InputView.readBridgeSize(this.#onBridgeSizeSubmit.bind(this));
  }

  #onBridgeSizeSubmit(size) {
    InputValidator.validateEmpty(size);
    InputValidator.validateSpace(size);
    InputValidator.validateNumber(size);

    this.#game.setBridge(+size);

    InputView.readMoving(this.#onMovingSubmit.bind(this));
  }

  #onMovingSubmit(input) {
    const isCrossed = this.#game.move(input);
    const bridgeMap = this.#game.getMap();

    OutputView.printMap(bridgeMap);

    if (!isCrossed) {
      InputView.readGameCommand(this.#onGameCommandSubmit.bind(this));
      return;
    }
    if (this.#game.isWin()) {
      this.#runQuit();
      return;
    }

    InputView.readMoving(this.#onMovingSubmit.bind(this));
  }

  #onGameCommandSubmit(input) {
    if (input === GAME_RULE.RETRY) {
      this.#runRetry();
      return;
    }
    if (input === GAME_RULE.QUIT) {
      this.#runQuit();
      return;
    }

    throw new Error('[ERROR] 재시도 여부 입력값은 R 또는 Q여야 합니다.');
  }

  #runRetry() {
    this.#game.retry();
    InputView.readMoving(this.#onMovingSubmit.bind(this));
  }

  #runQuit() {
    const bridgeMap = this.#game.getMap();
    OutputView.printResult(bridgeMap);
    Console.close();
  }
}

module.exports = BridgeGameController;
