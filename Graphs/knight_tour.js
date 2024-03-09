class Board {
  constructor(size) {
    this.size = size;
    this.visited = Array(size).fill(0).map(() => Array(size));
  }
  isvalidMove(x, y) {
    //constraints
    return (
      x < this.size && y < this.size && x > -1 && y > -1 && !this.visited[x][y]
    );
  }
  knightMoves(start, target) {

    const drow = [2, 2, -2, -2, 1, 1, -1, -1]
    const dcol = [1, -1, 1, -1, 2, -2, 2, -2]

    start = { x: start[0], y: start[1], path: [[start[0], start[1]]] };
    target = { x: target[0], y: target[1] };

    let queue = [start];
    while (queue.length) {
      let curr = queue.shift();

      // if target is found, show and return
      if (curr.x == target.x && curr.y == target.y) {
        console.log("Moves needed", curr.path.length - 1);
        console.log(curr.path);
        return;
      }

      //otherwise, put all valid moves from current on queue
      for(let i in drow) {
        let x = curr.x + drow[i]
        let y = curr.y + dcol[i]
        if (this.isvalidMove(x, y)) {
          queue.push({ x, y, path: [...curr.path, [x, y]] });
          this.visited[x][y] = true;
        }
      }
    }
  }
}

const board = new Board(8);
board.knightMoves([0, 0], [5, 3]);
