import { GAMEPLAY } from "./../constants";
import { GameCache } from "../cache";

export class Ball extends createjs.Bitmap {
  constructor({ x = 0, y = 0, game } = {}) {
    super(GameCache.images["ball"]);

    // Set objects origin point to the middle;
    // -- getBounds() will fail if you're not using a cached image, as it won't be loaded yet.
    // -- ex: super('./assets/ball.png');
    this.regX = this.getBounds().width / 2;
    this.regY = this.getBounds().height / 2;

    this.x = x;
    this.y = y;

    this.velY = 0;
    this.velX = 0;

    this.game = game;

    // if a user clicks on a ball, change the color
    this.addEventListener("click", this.changeColor);
  }

  update() {
    this.velY += GAMEPLAY.GRAVITY;
    this.y += this.velY;

    const bounds = this.getBounds();

    if (bounds.height / 2 + this.y >= GAMEPLAY.HEIGHT) {
      this.y = GAMEPLAY.HEIGHT - bounds.height / 2 - 1;
      this.velY *= -1;

      if (!this.hitSound) {
        // get sound instance
        this.hitSound = createjs.Sound.play("bounce");
        this.hitSound.volume = this.game.sfxVolume; // <-- apply current SFX volume;
      } else {
        this.hitSound.volume = this.game.sfxVolume;
        this.hitSound.play();
      }
    }
  }

  changeColor(e) {
    const _ball = e.target;
    _ball.filters = [
      new createjs.ColorFilter(
        0,
        0,
        0,
        1,
        _ball.getRandomColorValue(),
        _ball.getRandomColorValue(),
        _ball.getRandomColorValue(),
        1
      )
    ];
    _ball.cache(0, 0, 64, 64);
  }

  getRandomColorValue() {
    return Math.floor(Math.random() * 255) + 1; // number between 1 and 255
  }
}
