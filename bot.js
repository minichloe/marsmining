const { register } = require('./requests');

class Bot {
  constructor() {
    this.ID = process.env.CALLSIGN;
    this.register = false;
    this.active = false;
    this.location = [0, 0];
    this.claims = [];
    this.score = 0;
  }
  confirmRegistration() {
    if (!this.register) {
      console.log('Initializing bot...');
      this.initialize();
    } else this.printStatus();
  }
  async initialize() {
    this.toggleActive();
    const data = await register();
    this.toggleActive();
    this.register = true;
    const [x, y] = [data.Location.X, data.Location.Y];
    this.updateLocation(x, y);
    this.updateScore(data.Score);
    this.claims = data.Claims;
    this.printStatus();
  }
  updateLocation(x, y) {
    this.location = [x, y];
  }
  toggleActive() {
    this.active = !this.active;
  }
  updateScore(score) {
    this.score = score;
  }
  addClaim(claim) {
    if (this.claims.length > 3) return 'Exceeded maximum';
    else this.claims.push(claim);
  }
  removeClaim(claim) {
    this.claims = this.claims.filter(x => x !== claim);
  }
  printStatus() {
    console.log(`
    ⭐️⭐️⭐️ STATUS for ${this.ID} ⭐️⭐️⭐️\n
    Location: ${this.location}\n
    Claims: ${this.claims}\n
    Score: ${this.score}\n
    ⭐️⭐️⭐️⭐️ END STATUS UPDATE ⭐️⭐️⭐️⭐️\
    `);
  }
}

module.exports = Bot;
