import { Scene } from "./scene";
import { Ball } from "../gameobjects/ball";
import { StopWatch } from "../gameobjects/stopwatch";
import { GameCache } from "../cache";
import { EndScene } from "./end";

export class GameScene extends Scene {
  constructor(game, total) {
    super(game);
    this.balls = [];
    this.clicked = [];
    this.total = total;
  }

  preload() {
    // load necessary objects
    const queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound); // <-- SoundJS has a cache built in.;
    queue.loadFile({ id: "ball", src: "./assets/images/Ball.png" });
    queue.loadFile({ id: "bounce", src: "./assets/sound/bounce.ogg" });
    queue.loadFile({ id: "click", src: "./assets/sound/click.mp3" });
    queue.loadFile({ id: "tick", src: "./assets/sound/tick.mp3" });
    queue.loadFile({ id: "tada", src: "./assets/sound/tada.mp3" });

    queue.on("fileload", event => GameCache.onLoad(event));

    const loadComplete = new Promise((resolve, reject) => {
      queue.on("complete", resolve);
    });

    queue.load();
    return loadComplete;
  }

  start() {
    // add some items to this scene

    this.createStopWatch(this.game);

    for (let i = 0; i < this.total; i++) {
      this.createAndAddBall(this.game, i + 1);
    }
  }

  createStopWatch(game) {
    this.stopwatch = new StopWatch({
      game: game,
      x: 50,
      y: 50
    });
    this.addChild(this.stopwatch);
  }

  createAndAddBall(game, num) {
    const name = `ball${num}`;
    this[name] = new Ball({
      game: game,
      x: (game.width / (this.total + 1)) * num,
      y: this.game.height / (num + 1)
    });
    this.addChild(this[name]);
    this.balls.push(name);
  }

  update(deltaTime) {
    // bounce the balls
    this.balls.forEach(function(ball) {
      this[ball].update(deltaTime);
      if (this[ball].clicked) {
        this.clicked.push(this[ball].id);
      }
    }, this);

    // increment the stopwatch
    let timePlaying = this.stopwatch.update(deltaTime);

    // check to see if all balls are clicked and if they are, game over!
    if (
      this.clicked.filter((v, i) => this.clicked.indexOf(v) === i).length ==
      this.total
    ) {
      const nextScene = new EndScene(this.game, timePlaying);
      nextScene.preload().then(() => {
        this.game.app.state.scene.value = nextScene;
      });
    }
  }
}
