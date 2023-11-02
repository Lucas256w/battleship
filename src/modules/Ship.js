class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
    this.sunked = false;
  }

  static hit() {
    this.timesHit += 1;
  }

  static isSunk() {
    if (this.timesHit === this.length) {
      this.sunked = true;
      return this.sunked;
    }
  }
}

export default Ship;
