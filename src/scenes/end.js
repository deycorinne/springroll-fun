import { GameScene } from "./gameScene";
import { Scene } from "./scene";
import { GAMEPLAY } from "../constants";

export class EndScene extends Scene {
  constructor(game, timePlaying) {
    super(game);
    this.timePlaying = timePlaying;
  }

  start() {
    // a clickable label to cause a scene change
    let title = new createjs.Text(
      "Congrats!! You clicked all the balls!",
      "40px Arial",
      "#ffffff"
    );
    title.x = GAMEPLAY.WIDTH / 2 - title.getBounds().width / 2;
    title.y = GAMEPLAY.HEIGHT / 3 - title.getBounds().height;

    this.addChild(title);

    let score = new createjs.Text(
      `It took you ${this.timePlaying} seconds! Try again and see if you can beat that score!`,
      "20px Arial",
      "#ffffff"
    );
    score.x = GAMEPLAY.WIDTH / 2 - score.getBounds().width / 2;
    score.y = GAMEPLAY.HEIGHT / 2 - score.getBounds().height;

    this.addChild(score);

    if (!this.tadaSound) {
      // get sound instance
      this.tadaSound = createjs.Sound.play("tada");
      this.tadaSound.volume = this.game.sfxVolume; // <-- apply current SFX volume;
    } else {
      this.tadaSound.volume = this.game.sfxVolume;
      if (this.deltaTime > 1) {
        this.tadaSound.play();
        this.deltaTime = 0;
      }
    }

    // TODO: add dancing character to celebrate and restart button
  }
}
