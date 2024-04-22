class ScoreBoard {
    private score: number = 0;
    private level: number = 1;
    scoreElem: HTMLElement;
    levelElem: HTMLElement;
    maxLv: number;
    levelUpScore: number;

    //10是默认值，如果有创建对象的时候传新的maxLv则用参数的，否则都是默认10
    constructor(maxLv: number = 10, levelUpScore: number = 10) {
        this.scoreElem = document.getElementById('score')!;
        this.levelElem = document.getElementById('level')!;
        this.maxLv = maxLv;
        this.levelUpScore = levelUpScore;
    }

    //add score
    addScore() {
        this.score++;
        this.scoreElem.innerHTML = this.score + "";
        //level up every 10 points
        if (this.score % this.levelUpScore === 0) {
            this.levelUp();
        }
    }
    //minus score
    minusScore() {
        this.score--;
        this.scoreElem.innerHTML = this.score + "";
    }
    // level up
    levelUp() {
        if (this.level < this.maxLv) {
            this.level++;
            this.levelElem.innerHTML = this.level + "";
        }
    }
}

export default ScoreBoard;