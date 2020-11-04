"use strict";
(() => {
  class MazeRenderer {
    constructor(canvas) {
      this.ctx = canvas.getContext("2d");
      this.WALL_SIZE = 10;
    }

    render(date) {
      canvas.height = date.length * this.WALL_SIZE;
      canvas.width = date[0].length * this.WALL_SIZE;
      // メソット＝関数（機能実施）canvasを使って、配列通りに描画したいので
      // 行数分のループを作る！
      for (let row = 0; row < date.length; row++) {
        // 行数分の中に列数分のループを回せるのでCOLがループ作る
        for (let col = 0; col < date[0].length; col++) {
          // for (let col = 0; col < date[row].length; col++) {
          // 条件分析 自己定义迷路 如果用if条件！
          if (date[row][col] === 1) {
            this.ctx.fillRect(
              col * this.WALL_SIZE,
              row * this.WALL_SIZE,
              this.WALL_SIZE,
              this.WALL_SIZE
            );
          }
        }
      }
    }
  }



  class Maze {
    constructor(row, col, renderer) {
      // 行と列の長さは５以上の奇数でなくはいけないので
      if (row < 5 || col < 5 || row % 2 === 0 || col % 2 === 0) {
        alert("Size not valid");
        return;
      }

      this.renderer = renderer;
      this.row = row;
      this.col = col;

      // this.WALL_SIZE = 10; //マジックナンバーの書き方！！
      // canvas.height = this.row * this.WALL_SIZE;
      // canvas.width = this.col * this.WALL_SIZE;
      // 迷路のデータ(date)をプロパティとして保持していきたいので
      // 二次元配列を作って、１が壁、０が通路として管理する！
      // データをざっと作る date这里是数据的意思
      // this.date=[[],[],[],[]]配列の中に配列がある
      // this.date=[{},{},{},{}]配列の中にメソットがある
      this.date = this.getDate();
      // this.date = [
      //   // 0,1实心与空心 通路と壁 0と１
      //   [1, 1, 1, 1, 1],
      //   [1, 0, 0, 0, 1],
      //   [1, 0, 1, 0, 1],
      //   [1, 0, 0, 0, 1],
      //   [1, 1, 1, 1, 1],
      // ];
    }
    getDate() {
      // 外部行列（1）第一层
      const date = [];
      for (let row = 0; row < this.row; row++) {
        date[row] = [];
        for (let col = 0; col < this.col; col++) {
          date[row][col] = 1;
        }
      }
      // 内部行列（0）第二层
      for (let row = 1; row < this.row - 1; row++) {
        for (let col = 1; col < this.col - 1; col++) {
          date[row][col] = 0;
        }
      }
      // 内部第三层 每两个行与列发生变化！（+=2）
      for (let row = 2; row < this.row - 2; row += 2) {
        for (let col = 2; col < this.col - 2; col += 2) {
          date[row][col] = 1;
        }
      }
      for (let row = 2; row < this.row - 2; row += 2) {
        for (let col = 2; col < this.col - 2; col += 2) {
          // 行与列的方向 倒す先是随意的
          let destRow;
          let destCol;

          // 一回実行して、条件を合わなかった場合はやり直すという処理する
          // 一行目の棒をランダムに倒す方法！！四个方向倒す（移动）
          // 二行目以降の棒をランダムに倒す方法！！三个方向倒す（移动）
          do {
            // const dir = Math.floor(Math.random() * 4);
            const dir =
              row === 2
                ? Math.floor(Math.random() * 4) //一行目
                : Math.floor(Math.random() * 3) + 1; //二行目以降

            switch (dir) {
              case 0: //up倒す
                destRow = row - 1;
                destCol = col;
                break;
              case 1: //down倒す
                destRow = row + 1;
                destCol = col;
                break;
              case 2: //leftたおす
                destRow = row;
                destCol = col - 1;
                break;
              case 3: //right倒す
                destRow = row;
                destCol = col + 1;
                break;
            }
          } while (date[destRow][destCol] === 1);

          date[destRow][destCol] = 1; //位置を壁にする
        }
      }
      return date;
    }

    render() {
      this.renderer.render(this.date);
    }
  }
  const canvas = document.querySelector("canvas");
  if (typeof canvas.getContext === "undefined") {
    return;
  }

  const maze = new Maze(37, 57, new MazeRenderer(canvas));
  maze.render();
})();
