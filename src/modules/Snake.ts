class Snake {
    //get snake headelem
    snakeHead: HTMLElement;
    //HTMLCollection会自动更新
    snakeBodies: HTMLCollection;
    snakeElem: HTMLElement;
    constructor() {
        this.snakeHead = document.querySelector('#snake > div')!;
        this.snakeBodies = document.getElementById('snake')!.getElementsByTagName('div'); //返回的是collection，queryselectall会返回nodelist吗，不是动态的
        this.snakeElem = document.getElementById("snake")!;
    }

    //get snake head offsets
    get x() {
        return this.snakeHead.offsetLeft;
    }

    get y() {
        return this.snakeHead.offsetTop;
    }

    //set snake head offsets
    set x(value: number) {
        this.snakeHead.style.left = value + 'px';
    }

    set y(value: number) {
        this.snakeHead.style.top = value + 'px';
    }

    //add snake bodies
    addBody() {
        this.snakeElem.insertAdjacentHTML("beforeend", "<div></div>")
    }
}

export default Snake;