import { GAMEPLAY } from "./../constants";
import { GameCache } from "../cache";

export class StartAnimals extends createjs.Bitmap {
  constructor({ x = 0, y = 0, game } = {}) {
    super(GameCache.images["startAnimals"]);

    // Set objects origin point to the middle;
    // -- getBounds() will fail if you're not using a cached image, as it won't be loaded yet.
    // -- ex: super('./assets/ball.png');
    this.regX = this.getBounds().width / 2;
    this.regY = this.getBounds().height / 2;

    this.x = x;
    this.y = y;

    this.game = game;
  }

  update() {
  }
}
