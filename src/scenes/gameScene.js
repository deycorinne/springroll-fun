import { Scene } from "./scene";
import { Ball } from "../gameobjects/ball";
import { StopWatch } from "../gameobjects/stopwatch";
import { GameCache } from "../cache";

export class GameScene extends Scene {
  constructor(game) {
    super(game);
    this.balls = [];
  }

  preload() {
    // load necessary objects
    const queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound); // <-- SoundJS has a cache built in.;
    queue.loadFile({ id: "ball", src: "./assets/Ball.png" });
    queue.loadFile({ id: "bounce", src: "./assets/bounce.ogg" });

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
    // TODO: get total input from user during title scene and remove hardcode
    const total = 10;
    for (let i = 0; i < total; i++) {
      this.createAndAddBall(this.game, i + 1, total);
    }
  }

  createStopWatch(game) {
      this.stopwatch = new StopWatch({
          game: game,
          x: 50,
          y: 50
      })
      this.addChild(this.stopwatch)
  }

  createAndAddBall(game, num, total) {
    const name = `ball${num}`;
    this[name] = new Ball({
      game: game,
      x: (game.width / (total + 1)) * num,
      y: this.game.height / (num + 1)
    });
    this.addChild(this[name]);
    this.balls.push(name);
  }

  update(deltaTime) {
    // bounce the balls
    this.balls.forEach(function(ball) {
      this[ball].update(deltaTime);
    }, this);

    this.stopwatch.update();
  }
}
