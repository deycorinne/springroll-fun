import { GAMEPLAY } from "./../constants";
import { GameCache } from "../cache";

export class Tears extends createjs.Bitmap {
  constructor({ x = 0, y = 0, game } = {}) {
    super(GameCache.images["tear"]);

    // Set objects origin point to the middle;
    // -- getBounds() will fail if you're not using a cached image, as it won't be loaded yet.
    // -- ex: super('./assets/ball.png');
    this.scale = 0.02;
    this.regX = this.getBounds().width / 2;
    this.regY = this.getBounds().height / 2;

    this.startY = y;

    this.x = x;
    this.y = y;

    this.velY = GAMEPLAY.GRAVITY * 2;
    this.velX = 0;

    this.game = game;
  }

  update() {
    this.y += this.velY;

    if (this.y - this.startY >= 25) {
      this.y = this.startY;
    }
  }
}
