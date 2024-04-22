class Snake {
    //get snake headelem
    snakeHead: HTMLElement;
    //HTMLCollection会自动更新
    snakeBodies: HTMLCollection;
    snakeElem: HTMLElement;
    constructor() {
        this.snakeHead = document.querySelector('#snake > div')!;
        this.snakeBodies = document.getElementById('snake')!.getElementsByTagName('div'); //返回的是HTMLcollection（动态），queryselectall会返回nodelist（静态）
        this.snakeElem = document.getElementById("snake")!;
    }

    //get snake head offsets
    get x() {
        return this.snakeHead.offsetLeft;
    }

    get y() {
        return this.snakeHead.offsetTop;
    }

    set x(value: number) {
        if (this.x === value) {
            return;
        }
        //hit the bound
        if (value < 0 || value > 290) {
            throw new Error('the snake hit the bound.')
        }
        //处理掉头-水平方向
        if (this.snakeBodies[1] && (this.snakeBodies[1] as HTMLElement).offsetLeft === value) {
            //第二节存在且第二个和头重合即掉头
            if (value > this.x) {
                //这时候向右走，如果这时候发生掉头应该继续向左走
                value = this.x - 10; //反方向（向左）修正方向
            } else {
                value = this.x + 10;
            }
        }

        //move bodies
        this.moveBody();
        //move head
        this.snakeHead.style.left = value + 'px';
        this.checkOverlap()
    }

    set y(value: number) {
        if (this.y === value) {
            return;
        } 
        //hit the bound
        if (value < 0 || value > 290) {
            throw new Error('The snake hits the wall!')
        }

        //处理掉头-垂直方向
        if (this.snakeBodies[1] && (this.snakeBodies[1] as HTMLElement).offsetTop === value) {
            //第二节存在且第二个和头重合即掉头
            if (value > this.y) {
                //这时候向右走，如果这时候发生掉头应该继续向左走
                value = this.y - 10; //反方向（向左）修正方向
            } else {
                value = this.y + 10;
            }
        }
        //move bodies
        this.moveBody();
        //move head
        this.snakeHead.style.top = value + 'px';
        this.checkOverlap();
    }

    //add snake bodies
    addBody() {
        this.snakeElem.insertAdjacentHTML("beforeend", "<div></div>")
    }

    //body move
    moveBody() {
        //将后边的身体设置为前面身体的位置，从后往前改， 如4 = 3. 3 = 2。 2 = 1 。。
        for (let i = this.snakeBodies.length-1; i>0; i--) {
            //倒数第二个
            //collection里的元素类型为Element，offsetXxx是HTMLElement 类型，也是Element的子类，因此要断言
            let next_x = (this.snakeBodies[i-1] as HTMLElement).offsetLeft;
            let next_y = (this.snakeBodies[i-1] as HTMLElement).offsetTop;
            //reset current body
            (this.snakeBodies[i] as HTMLElement).style.left = next_x + 'px';
            (this.snakeBodies[i] as HTMLElement).style.top = next_y + 'px';

        }
    }

    //check if the bodies overlapped
    checkOverlap() {
        for (let i=1; i < this.snakeBodies.length; i++) {
            let body = this.snakeBodies[i] as HTMLElement;
            if (this.x === body.offsetLeft && this.y === body.offsetTop) {
                //head overlapped with body
                throw new Error("The snake head hit the body!");
            }
        }
    }
}

export default Snake;