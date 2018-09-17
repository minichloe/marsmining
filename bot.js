class Bot {
  constructor() {
    this.register = false;
    this.active = false;
    this.location = [0, 0];
    this.claims = [];
    this.score = 0;
  }
  updateLocation = (x, y) => {
    this.location = [x, y];
  };
  isRegistered = () => {
    return this.register;
  };
  toggleActive = () => {
    this.active = !this.active;
  };
  updateScore = score => {
    this.score = score;
  };
  addClaim = claim => {
    if (this.claims.length > 3) return 'Exceeded maximum';
    else this.claims.push(claim);
  };
  removeClaim = claim => {
    this.claims = this.claims.filter(x => x !== claim);
  };
}

module.exports = Bot;
