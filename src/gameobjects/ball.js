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

    this.clicked = false;

    // if a user clicks on a ball, change the color
    this.addEventListener("click", this.handleClick);
  }

  update() {
    this.velY += GAMEPLAY.GRAVITY;
    this.y += this.velY;

    const bounds = this.getBounds();

    if (bounds.height / 2 + this.y >= GAMEPLAY.HEIGHT) {
      this.y = GAMEPLAY.HEIGHT - bounds.height / 2 - 1;
      this.velY *= -1;

      this.playSound("bounceSound", "bounce");
    }
  }

  handleClick(e) {
    const _ball = e.target;

    _ball.changeColor(_ball);
    _ball.playSound("clickSound", "click");
    _ball.clicked = true;
  }

  playSound(soundName, file) {
    if (!this[soundName]) {
      // get sound instance
      this[soundName] = createjs.Sound.play(file);
      this[soundName].volume = this.game.sfxVolume; // <-- apply current SFX volume;
    } else {
      this[soundName].volume = this.game.sfxVolume;
      this[soundName].play();
    }
  }

  changeColor(ball) {
    ball.filters = [
      new createjs.ColorFilter(
        0,
        0,
        0,
        1,
        ball.getRandomColorValue(),
        ball.getRandomColorValue(),
        ball.getRandomColorValue(),
        1
      )
    ];
    ball.cache(0, 0, 64, 64);
  }

  getRandomColorValue() {
    return Math.floor(Math.random() * 255) + 1; // number between 1 and 255
  }
}
