class Food {
    //food elem (div)
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('food')!; //有可能取不到为null，！表示不可能为空，让检查器忽略
    }

    // get food current x-position
    get x() {
        return this.element.offsetLeft;
    }
    //get food current y-position
    get y() {
        return this.element.offsetTop;
    }

    //change food position randomly
    changePosition() {
        //offsets must be multiple of 10px
        this.element.style.left = Math.round(Math.random() * 29) * 10 + "px";
        this.element.style.top = Math.round(Math.random() * 29) * 10 + "px";
    }
}

export default Food;