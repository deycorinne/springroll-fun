import { GameScene } from "./gameScene";
import { Scene } from "./scene";
import { GAMEPLAY } from "../constants";

export class TitleScene extends Scene {
  constructor(game) {
    super(game);
  }

  start() {
    // a clickable label to cause a scene change
    let title = new createjs.Text(
      "Click all the balls to change their colors!",
      "40px Arial",
      "#ffffff"
    );
    title.x = GAMEPLAY.WIDTH / 2 - title.getBounds().width / 2;
    title.y = GAMEPLAY.HEIGHT / 3 - title.getBounds().height;

    this.addChild(title);

    let begin = new createjs.Text(
      "Click here to begin playing!",
      "20px Arial",
      "#ffffff"
    );
    begin.x = GAMEPLAY.WIDTH / 2 - begin.getBounds().width / 2;
    begin.y = GAMEPLAY.HEIGHT / 2 - begin.getBounds().height;

    begin.addEventListener("click", () => {
      // when the label is clicked, preload the game scene and then tell the app to switch scenes
      const nextScene = new GameScene(this.game);
      nextScene.preload().then(() => {
        this.game.app.state.scene.value = nextScene;
      });
    });

    this.addChild(begin);
  }
}
