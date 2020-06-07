class Dice {
  constructor() {
    this.value = this.getRandomNumber();
  }
  getRandomNumber() {
    return 1 + Math.floor(Math.random() * 6);
  }
  roll() {
    this.value = this.getRandomNumber();
  }
}

export default Dice;
