class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
    this.sunked = false;
  }

  hit() {
    this.timesHit += 1;
    this.isSunk();
  }

  isSunk() {
    this.sunked = this.timesHit === this.length;
  }
}

export default Ship;
