import { GameScene } from "./gameScene";
import { Scene } from "./scene";
import { GAMEPLAY } from "../constants";
import { Animals } from "../gameobjects/animals";
import { GameCache } from "../cache";
import { Tears } from "../gameobjects/tears"

export class TitleScene extends Scene {
  constructor(game) {
    super(game);
    this.game = game;
  }

  preload(){
    const queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound); // <-- SoundJS has a cache built in.;
    queue.loadFile({ id: "startAnimals", src: "./assets/images/cat_and_dog1.png" });
    queue.loadFile({ id: "tear", src: "./assets/images/tear.png" });
    queue.on("fileload", event => GameCache.onLoad(event));

    const loadComplete = new Promise((resolve, reject) => {
      queue.on("complete", resolve);
    });

    queue.load();
    return loadComplete;
  }

  start() {
    // include intro and directions for game
    this.addGameIntroAnimals();
    this.addGameInstructions();
    this.addGameOptions();
  }

  addGameIntroAnimals(){
    let startAnimals = new Animals({
      game: this.game,
      x: (GAMEPLAY.WIDTH / 2), 
      y: (GAMEPLAY.HEIGHT / 2.5),
      img: "startAnimals",
      scale: .35
    })
    this.addChild(startAnimals);

    this.catTears = new Tears({
      game: this.game,
      x: (GAMEPLAY.WIDTH / 2) + 28, 
      y: (GAMEPLAY.HEIGHT / 2.5) - 25
    });
    this.addChild(this.catTears);

    this.dogTears = new Tears({
      game: this.game,
      x: (GAMEPLAY.WIDTH / 2) - 100, 
      y: (GAMEPLAY.HEIGHT / 2) - 40   
    });
    this.addChild(this.dogTears);

    let intro = new createjs.Text(
      "Aww! These poor animals are sad because their toys are boring.",
      "24px Arial",
      "#ffffff"
    );
    intro.x = GAMEPLAY.WIDTH / 2 - intro.getBounds().width / 2;
    intro.y = GAMEPLAY.HEIGHT / 6;

    this.addChild(intro);
  }

  addGameInstructions(){
    let click = new createjs.Text(
      "Help them click all the balls to change their colors!",
      "30px Arial",
      "#ffffff"
    );
    click.x = (GAMEPLAY.WIDTH / 2) - (click.getBounds().width / 2);
    click.y = ((GAMEPLAY.HEIGHT * 2) / 3) - (click.getBounds().height + 25);

    this.addChild(click);
    
    let begin = new createjs.Text(
      "Click a number above to begin playing!",
      "20px Arial",
      "#ffffff"
    );
    begin.x = (GAMEPLAY.WIDTH / 2) - (begin.getBounds().width / 2);
    begin.y = ((GAMEPLAY.HEIGHT * 3) / 4) - (begin.getBounds().height) +50;

    this.addChild(begin);
  }

  addGameOptions(){
    // game options: 3, 6, or 12 balls
    let three = new createjs.Text("3", "50px Arial", "#a634ba");
    three.x = GAMEPLAY.WIDTH / 3; // / (this.total + 1)) * num
    three.y = ((GAMEPLAY.HEIGHT * 3) / 4) - (three.getBounds().height);

    this.addChild(three);

    let six = new createjs.Text("6", "50px Arial", "#c7228d");
    six.x = (GAMEPLAY.WIDTH / 2) - (six.getBounds().width / 2);
    six.y = ((GAMEPLAY.HEIGHT * 3) / 4) - (six.getBounds().height);

    this.addChild(six);

    let twelve = new createjs.Text("12", "50px Arial", "#2267c7");
    twelve.x = ((GAMEPLAY.WIDTH * 2) / 3) - (twelve.getBounds().width / 2); // / (this.total + 1)) * num
    twelve.y = ((GAMEPLAY.HEIGHT * 3) / 4) - (twelve.getBounds().height);

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

  update() {
    this.catTears.update();
    this.dogTears.update();
  }
}
