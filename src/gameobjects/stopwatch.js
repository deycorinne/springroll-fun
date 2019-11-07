export class StopWatch extends createjs.Text {
  constructor({ x = 0, y = 0, game } = {}) {
    super({});

    this.startTime = new Date().getTime();
    this.deltaTime = 0;

    this.color = "#FFF";

    this.x = x;
    this.y = y;

    this.font = "bold 36px Arial";

    this.game = game;
  }

  update(deltaTime) {
    this.deltaTime += deltaTime;
    const currentTime = new Date().getTime();
    const time = Math.floor((currentTime - this.startTime) / 1000);
    this.text = time + "s";

    if (!this.tickSound) {
      // get sound instance
      this.tickSound = createjs.Sound.play("tick");
      this.tickSound.volume = this.game.sfxVolume; // <-- apply current SFX volume;
    } else {
      this.tickSound.volume = this.game.sfxVolume;
      if(this.deltaTime > 1) {
        this.tickSound.play();
        this.deltaTime = 0;
      }
    }
    return time;
  }
}
