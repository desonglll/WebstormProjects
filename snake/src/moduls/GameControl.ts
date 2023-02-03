// 引入其他的类
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

// 游戏控制器，控制其他所有类
class GameControl {
  // 定义三个属性
  // snake
  snake: Snake;
  // food
  food: Food;
  // scorePanel
  scorePanel: ScorePanel;

  //创建一个属性来存储蛇的移动方向（也就是按键的方向）
  direction: string = "Right";

  //创建一个属性用来记录游戏是否结束
  isLive = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();

    this.init();
  }

  //游戏的初始化方法，调用后游戏即开始
  init() {
    // 绑定键盘按键按下的事件
    document.addEventListener("keydown", this.keydownHandler.bind(this));
    this.run();
  }

  //创建一个键盘按下的响应函数
  keydownHandler(event: KeyboardEvent) {
    //需要检查event.key是否合法

    //修改direction属性
    this.direction = event.key;
  }

  //创建一个控制移动的方向
  run() {
    //based on value of this.direction.
    //get current position of snake.
    let X = this.snake.X;
    let Y = this.snake.Y;
    //change x value and y value by keyboard direction.
    switch (this.direction) {
      //move to up.
      case "ArrowUp":
      case "Up":
        Y -= 10;
        break;
      //move to down.
      case "ArrowDown":
      case "Down":
        Y += 10;
        break;
      //move to left.
      case "ArrowLeft":
      case "Left":
        X -= 10;
        break;
      //move to right.
      case "ArrowRight":
      case "Right":
        X += 10;
        break;

      default:
        break;
    }

    //test whether snake ate food.
    this.checkEat(X, Y);

    //change X Y value of snake.
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e: any) {
      //进入到catch，说明出现了异常，游戏结束，弹出一个信息提示
      alert(e.message + "Game Over!");
      //将isLive设置为false
      this.isLive = !this.isLive;
    }
    //open a timeout.
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

  //test whether snake ate food.
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      //reset the position of food.
      this.food.change();
      //add score.
      this.scorePanel.addScore();
      //add a body for snake.
      this.snake.addBody();
    }
  }
}

export default GameControl;
