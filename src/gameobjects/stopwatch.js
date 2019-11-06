
export class StopWatch extends createjs.Text {
  constructor({ x = 0, y = 0, game } = {}) {
    super({});

    this.startTime = new Date().getTime();

    this.color = "#FFF";

    this.x = x;
    this.y = y;

    this.font = "bold 36px Arial";

    this.game = game;
  }

  update() {
    const currentTime = new Date().getTime();
    const time = Math.floor((currentTime - this.startTime) / 1000);
    this.text = time + "s";
  }
}
