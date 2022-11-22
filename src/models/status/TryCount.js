class TryCount {
  static #INITIAL_STATE = 0;

  #state = TryCount.#INITIAL_STATE;

  /**
   * 상태 가져올 때 사용하는 메서드
   * @returns {number}
   */
  getState() {
    return this.#state;
  }

  /**
   * 위치 증가할 때 사용하는 메서드
   */
  increment() {
    this.#state += 1;
  }
}

module.exports = TryCount;