import Snake from "./Snake";
import Food from "./Food";
import ScoreBoard from "./ScoreBoard";

class GameControl {
    snake: Snake;
    food: Food;
    scoreBoard: ScoreBoard;
    direction: string = '';
    gameOver: boolean = false;

    constructor() {
        //get all objects
        this.snake = new Snake();
        this.food = new Food();
        this.scoreBoard = new ScoreBoard();
        //创建对象后直接开始游戏
        this.gameInit()
    }

    // start the game
    gameInit() {
        //bind keydown control
        //this因为是addEventListener调用的，this指向的是document而不是当前GC对象
        //bind()相当于创建了一个新函数，把原来的this绑定为当前GC对象的this
        document.addEventListener("keydown", this.keydownHandler.bind(this));
        //只调一次
        this.moveSnake();
    }

    //keydown handler
    keydownHandler(event: KeyboardEvent) {
        //check keys before assignment

        this.direction = event.key;
    }

    // control snake direction
    moveSnake() {
        //get snake's current offsets
        let new_x = this.snake.x;
        let new_y = this.snake.y;

        switch (this.direction) {
            case 'ArrowUp':
                new_y -= 10;
                break;
            case 'ArrowDown':
                new_y += 10;
                break;
            case 'ArrowLeft':
                new_x -= 10;
                break;
            case 'ArrowRight':
                new_x += 10;
                break;
        }

        this.checkEat(new_x, new_y);

        //check if the snake hits the bound
        try {
            this.snake.x = new_x;
            this.snake.y = new_y;
        } catch (error: any) {
            alert(error.message + ' The game is over');
            this.gameOver = true;
        }


        //定时调用,moveSnake执行到末尾的时候又开启定时器执行moveSnake
        this.gameOver || setTimeout(this.moveSnake.bind(this), 300 - (this.scoreBoard.level - 1) * 30);
    }

    //check if the snake got the food
    checkEat(x: number, y: number) {
        if(x === this.food.x && y === this.food.y){
            //operations after got the food
            this.food.changePosition();
            this.scoreBoard.addScore();
            this.snake.addBody();
        }
    }
}

export default GameControl;