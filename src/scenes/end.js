import { Scene } from "./scene";
import { GAMEPLAY } from "../constants";
import { GameCache } from "../cache";
import { Animals } from "../gameobjects/animals";
import { ReplayButton } from "../gameobjects/replayButton";
import { Smile } from "../gameobjects/smile";

export class EndScene extends Scene {
  constructor(game, timePlaying) {
    super(game);
    this.timePlaying = timePlaying;
  }

  preload(){
    const queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound); // <-- SoundJS has a cache built in.;
    queue.loadFile({ id: "endAnimals", src: "./assets/images/dog_and_cat.png" });
    queue.loadFile({ id: "replay", src: "./assets/images/replay.png" });
    queue.loadFile({ id: "smile", src: "./assets/images/smile.png" });
    queue.on("fileload", event => GameCache.onLoad(event));

    const loadComplete = new Promise((resolve, reject) => {
      queue.on("complete", resolve);
    });

    queue.load();
    return loadComplete;
  }
  
  start() {
    this.addHappyAnimals();

    this.addEndResults();
    this.playTadaSound();
  }

  addHappyAnimals(){
    let endAnimals = new Animals({
      game: this.game,
      x: (GAMEPLAY.WIDTH / 2), 
      y: (GAMEPLAY.HEIGHT / 2),
      img: "endAnimals",
      scale: 1
    })
    this.addChild(endAnimals);

    this.dogSmile = new Smile({
      game: this.game,
      x: (GAMEPLAY.WIDTH / 2) - 90, 
      y: (GAMEPLAY.HEIGHT / 2) + 20,
      scale: 0.03
    })
    this.addChild(this.dogSmile);

    this.catSmile = new Smile({
      game: this.game,
      x: (GAMEPLAY.WIDTH / 2) + 100, 
      y: (GAMEPLAY.HEIGHT / 2) - 10,
      scale: 0.02
    })
    this.addChild(this.catSmile);

    let replay = new ReplayButton({
      game: this.game,
      x: (GAMEPLAY.WIDTH / 2), 
      y: (GAMEPLAY.HEIGHT / 2)
    });
    this.addChild(replay);
  }

  addEndResults(){
    let title = new createjs.Text(
      "Yay!! You changed the color of all the balls!",
      "40px Arial",
      "#ffffff"
    );
    title.x = GAMEPLAY.WIDTH / 2 - title.getBounds().width / 2;
    title.y = GAMEPLAY.HEIGHT / 4 - title.getBounds().height;
    this.addChild(title);

    let score = new createjs.Text(
      `It took you ${this.timePlaying} seconds! Try again and see if you can beat that score!`,
      "20px Arial",
      "#ffffff"
    );
    score.x = (GAMEPLAY.WIDTH / 2) - (score.getBounds().width / 2);
    score.y = ((GAMEPLAY.HEIGHT * 5) / 6);

    this.addChild(score);
  }

  playTadaSound(){
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
  }
  
  update(){
    this.dogSmile.update();
    this.catSmile.update();
  }
}
