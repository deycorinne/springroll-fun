import { GameScene } from "./gameScene";
import { Scene } from "./scene";
import { GAMEPLAY } from "../constants";

export class TitleScene extends Scene {
  constructor(game) {
    super(game);
    this.game = game;
  }

  start() {
    // directions for game
    let title = new createjs.Text(
      "Click all the balls to change their colors!",
      "40px Arial",
      "#ffffff"
    );
    title.x = GAMEPLAY.WIDTH / 2 - title.getBounds().width / 2;
    title.y = GAMEPLAY.HEIGHT / 3 - title.getBounds().height;

    this.addChild(title);

    let begin = new createjs.Text(
      "Click a number below to begin playing!",
      "20px Arial",
      "#ffffff"
    );
    begin.x = GAMEPLAY.WIDTH / 2 - begin.getBounds().width / 2;
    begin.y = GAMEPLAY.HEIGHT / 2 - begin.getBounds().height;

    this.addChild(begin);

    // game options: 3, 6, or 12 balls
    let three = new createjs.Text("3", "50px Arial", "#a634ba");
    three.x = GAMEPLAY.WIDTH / 3; // / (this.total + 1)) * num
    three.y = (GAMEPLAY.HEIGHT * 3) / 4 - three.getBounds().height;

    this.addChild(three);

    let six = new createjs.Text("6", "50px Arial", "#c7228d");
    six.x = GAMEPLAY.WIDTH / 2 - three.getBounds().width / 2;
    six.y = (GAMEPLAY.HEIGHT * 3) / 4 - three.getBounds().height;

    this.addChild(six);

    let twelve = new createjs.Text("12", "50px Arial", "#2267c7");
    twelve.x = (GAMEPLAY.WIDTH * 2) / 3 - twelve.getBounds().width / 2; // / (this.total + 1)) * num
    twelve.y = (GAMEPLAY.HEIGHT * 3) / 4 - three.getBounds().height;

    this.addChild(twelve);

    // add click handlers for options
    three.addEventListener("click", this.handleClick);
    six.addEventListener("click", this.handleClick);
    twelve.addEventListener("click", this.handleClick);
  }

  handleClick(e) {
    const _button = e.target;
    const total = parseInt(_button.text);

    // when a number is clicked, preload the game scene and then tell the app to switch scenes
    const nextScene = new GameScene(_button.parent.game, total);
    nextScene.preload().then(() => {
      _button.parent.game.app.state.scene.value = nextScene;
    });
  }
}
