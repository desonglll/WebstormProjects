class Snake {
  // 表示Snake的元素
  // element: HTMLElement;
  head: HTMLElement;
  // body of snake include head.
  bodies: HTMLCollection;
  // 获取snake的容器
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById("snake")!;
    this.head = document.querySelector("#snake>div") as HTMLElement;
    this.bodies = document.getElementById("snake")!.getElementsByTagName("div");
  }

  // 获取snake(head)的坐标
  get X() {
    return this.head.offsetLeft;
  }

  get Y() {
    return this.head.offsetTop;
  }

  // 设置坐标
  set X(value: number) {
    //如果新值和旧值相同，则直接返回不再修改
    if (this.X === value) {
      return;
    }
    //x的合法值在0-290之间
    if (value < 0 || value > 290) {
      //进入判断则说明撞墙，抛出异常
      throw new Error("beat the wall!");
    }

    //修改x时，是在修改水平坐标，在向左移动时，不能向右掉头，反之亦然
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      //如果发生了掉头，让蛇向反方向继续移动
      if (value > this.X) {
        //如果新值value大于旧值x，则说明在向右走，此时发生掉头，应该继续向左走
        value = this.X - 10;
      }
      else {
        //向左走
        value = this.X + 10;
      }
    }

    //move body.
    this.moveBody();
    this.head.style.left = value + "px";

    //检查有没有撞到自己
    this.checkHeadBody();
  }

  set Y(value: number) {
    //如果新值和旧值相同，则直接返回不再修改
    if (this.Y === value) {
      return;
    }
    //y的合法值在0-290之间
    if (value < 0 || value > 290) {
      //进入判断则说明撞墙，抛出异常
      throw new Error("Beat the wall! ");
    }

    //修改y时，是在修改垂直坐标，在向上移动时，不能向下掉头，反之亦然
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      //如果发生了掉头，让蛇向反方向继续移动
      if (value > this.Y) {
        value = this.Y - 10;
      }
      else {
        value = this.Y + 10;
      }
    }

    //move body.
    this.moveBody();
    this.head.style.top = value + "px";

    //检查有没有撞到自己
    this.checkHeadBody();
  }

  // 增加身体的方法
  addBody() {
    // 向element添加一个div
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }

  //添加身体移动的方法
  moveBody() {
    //将后边的身体设置为前边身体的位置
    //4=3,3=2,2=1...
    //遍历获取所有身体
    for (let i = this.bodies.length - 1; i > 0; i--) {
      //获取前边身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      //将值设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = X + "px";
      (this.bodies[i] as HTMLElement).style.top = Y + "px";
    }
  }

  //检查是否撞到自己
  checkHeadBody() {
    //获取所有身体，检查其是否和头的坐标发生重叠
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = (this.bodies[i] as HTMLElement);
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        //进入判断说明头撞到了身体，游戏结束
        throw new Error("Beat self! ");
      }
    }
  }
}
export default Snake;
