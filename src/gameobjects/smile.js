import { GAMEPLAY } from "./../constants";
import { GameCache } from "../cache";

export class Smile extends createjs.Bitmap {
  constructor({ x = 0, y = 0, game, scale } = {}) {
    super(GameCache.images["smile"]);

    // Set objects origin point to the middle;
    // -- getBounds() will fail if you're not using a cached image, as it won't be loaded yet.
    // -- ex: super('./assets/ball.png');
    this.scale = scale;
    this.regX = this.getBounds().width / 2;
    this.regY = this.getBounds().height / 2;

    this.startY = y;

    this.x = x;
    this.y = y;

    this.velY = GAMEPLAY.GRAVITY * 2;
    this.velX = 0;

    this.game = game;
    this.rotation = 0;
    this.countUp = true;
  }

  update() {
    if (this.countUp) {
        this.rotation += 1;
    } else {
        this.rotation -= 1;
    }
    if (this.rotation == 10) {
        this.countUp = false;
    }
    if (this.rotation == -10) {
        this.countUp = true;
    }
  }
}
