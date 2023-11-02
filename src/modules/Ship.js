class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
    this.sunked = false;
  }

  hit() {
    this.timesHit += 1;
  }

  isSunk() {
    this.sunked = this.timesHit === this.length;
    return this.sunked;
  }
}

export default Ship;
