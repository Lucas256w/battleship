class Ship {
  constructor(length, name) {
    this.length = length;
    this.timesHit = 0;
    this.sunked = false;
    this.isHorizontal = true;
    this.name = name;
  }

  hit() {
    this.timesHit += 1;
    this.isSunk();
  }

  isSunk() {
    this.sunked = this.timesHit === this.length;
  }

  rotate() {
    if (this.isHorizontal === true) {
      this.isHorizontal = false;
    } else {
      this.isHorizontal = true;
    }
  }
}

export default Ship;
