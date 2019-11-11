import { GAMEPLAY } from "../constants";
import { GameCache } from "../cache";

export class Animals extends createjs.Bitmap {
  constructor({ x = 0, y = 0, game, img, scale } = {}) {
    super(GameCache.images[img]);

    // Set objects origin point to the middle;
    // -- getBounds() will fail if you're not using a cached image, as it won't be loaded yet.
    // -- ex: super('./assets/ball.png');
    this.scale = scale || 1;
    this.regX = this.getBounds().width / 2;
    this.regY = this.getBounds().height / 2;

    this.x = x;
    this.y = y;

    this.game = game;
  }
}
