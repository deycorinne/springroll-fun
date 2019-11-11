import { GameCache } from "../cache";
import { TitleScene } from '../scenes/title';

export class ReplayButton extends createjs.Bitmap {
  constructor({ x = 0, y = 0, game } = {}) {
    super(GameCache.images["replay"]);

    // Set objects origin point to the middle;
    // -- getBounds() will fail if you're not using a cached image, as it won't be loaded yet.
    // -- ex: super('./assets/ball.png');
    this.scale = 0.5;
    this.regX = this.getBounds().width / 2;
    this.regY = this.getBounds().height / 2;

    this.x = x;
    this.y = y + this.getBounds().height / 2;

    this.game = game;

    // if a user clicks on this button, send them to the start screen of the game
    this.addEventListener("click", this.handleClick);
  }

  handleClick(e) {
    const _button = e.target;
    const total = parseInt(_button.text);

    // when clicked, preload the start scene and then tell the app to switch scenes
    const nextScene = new TitleScene(_button.parent.game);
    nextScene.preload().then(() => {
      _button.parent.game.app.state.scene.value = nextScene;
    });
  }
}
