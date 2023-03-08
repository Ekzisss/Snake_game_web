'use strict';

let bord = document.querySelector('table');

class Snake {
  #privateField;
  #CellsCount = [bord.rows.length, bord.rows[0].cells.length];
  #player;
  #apple;
  #rotation = 2;
  #score = 0;
  #gamespeed = 700;
  #bord;

  constructor(bord) {
    this.#bord = bord;
  }

  #render() {
    let func = () => {
      switch (this.#rotation) {
        case 0:
          this.#player[0] -= 1;
          this.#deleteTail(this.#player[0], this.#player[1]);
          if (this.#player[0] < 0) {
            this.#player[0] = this.#CellsCount[0] - 1;
          }
          break;
        case 1:
          this.#player[1] += 1;
          this.#deleteTail(this.#player[0], this.#player[1]);
          if (this.#player[1] >= this.#CellsCount[1]) {
            this.#player[1] = 0;
          }
          break;
        case 2:
          this.#player[0] += 1;
          this.#deleteTail(this.#player[0], this.#player[1]);
          if (this.#player[0] >= this.#CellsCount[0]) {
            this.#player[0] = 0;
          }
          break;
        case 3:
          this.#player[1] -= 1;
          this.#deleteTail(this.#player[0], this.#player[1]);
          if (this.#player[1] < 0) {
            this.#player[1] = this.#CellsCount[1] - 1;
          }
          break;
      }

      if (JSON.stringify(this.#player) == JSON.stringify(this.#apple)) {
        this.#score += 1;
        this.#gamespeed = this.#gamespeed / 1.25;
        this.#appleGen();
      }
      bord.rows[this.#player[0]].cells[this.#player[1]].style.background =
        'red';
      bord.rows[this.#apple[0]].cells[this.#apple[1]].style.background =
        'green';
      setTimeout(func, this.#gamespeed);
    };
    func();
  }

  start() {
    this.#player = [
      Math.round(Math.random() * (this.#CellsCount[0] - 1)),
      Math.round(Math.random() * (this.#CellsCount[1] - 1)),
    ];

    this.#apple = [
      Math.round(Math.random() * (this.#CellsCount[0] - 1)),
      Math.round(Math.random() * (this.#CellsCount[1] - 1)),
    ];

    this.#appleGen();

    document.onkeydown = (e) => {
      console.log(e);
      switch (e.key) {
        case 'ц':
        case 'w':
          this.#rotation = 0;
          break;
        case 'в':
        case 'd':
          this.#rotation = 1;
          break;
        case 'ы':
        case 's':
          this.#rotation = 2;
          break;
        case 'ф':
        case 'a':
          this.#rotation = 3;
          break;
      }
    };

    bord.rows[this.#player[0]].cells[this.#player[1]].style.background = 'red';
    bord.rows[this.#apple[0]].cells[this.#apple[1]].style.background = 'green';
    this.#render();
  }

  #appleGen() {
    while (
      this.#apple[0] == this.#player[0] &&
      this.#apple[0] == this.#player[0]
    ) {
      this.#apple = [
        Math.round(Math.random() * (this.#CellsCount[0] - 1)),
        Math.round(Math.random() * (this.#CellsCount[1] - 1)),
      ];
    }
  }

  #deleteTail(x, y) {
    setTimeout(() => {
      if (x >= bord.rows.length) {
        x = 0;
      } else if (x < 0) {
        x = bord.rows.length - 1;
      } else if (y >= bord.rows[0].cells.length) {
        y = 0;
      } else if (y < 0) {
        y = bord.rows[0].cells.length - 1;
      }
      // console.log(x + ' ' + y);
      bord.rows[x].cells[y].style.background = '';
    }, this.#gamespeed * (this.#score + 1));
  }
}

let game = new Snake(bord);
console.log(game.bord);
game.start();
