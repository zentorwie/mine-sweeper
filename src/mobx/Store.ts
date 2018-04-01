import { observable, action } from 'mobx';
import { randomizeMines } from '../util';
import { Cell } from '../Cell';

export enum CellStatus {
  UNEXPOSED = 'UNEXPOSED',
  MARKED = 'MARKED',
  EXPOSED = 'EXPOSED'
}

const dx = [-1, 0, 1, 0, -1, 1, -1, 1];
const dy = [0, -1, 0, 1, -1, 1, 1, -1];

export class BoardEntity {
  cells: CellEntity[][];
  rowCount: number;
  columnCount: number;
  mineCount: number;

  @observable markedCellCount: number;
  @observable unexposedCellCount: number;

  constructor(rowCount: number, columnCount: number, mineCount: number) {
    this.rowCount = rowCount;
    this.columnCount = columnCount;
    this.mineCount = mineCount;
    this.markedCellCount = 0;
    this.unexposedCellCount = rowCount * columnCount;

    const mines = randomizeMines(rowCount, columnCount, mineCount);
    this.cells = Array(rowCount)
      .fill(0)
      .map(_ =>
        Array(columnCount)
          .fill(0)
          .map(__ => new CellEntity(false))
      );

    mines.forEach(({ x, y }) => {
      console.log(x, y);
      this.cells[x][y].isMine = true;
    });

    this.computeNeiborMines();
  }

  computeNeiborMines() {
    for (let i = 0; i < this.rowCount; i++) {
      for (let j = 0; j < this.columnCount; j++) {
        const theCell = this.cells[i][j];
        theCell.neiborMine = 0;
        for (let k = 0; k < 8; k++) {
          const x = i + dx[k];
          const y = j + dy[k];
          if (x < 0 || x >= this.rowCount || y < 0 || y >= this.columnCount)
            continue;
          const neiborCell = this.cells[x][y];
          if (neiborCell.isMine) theCell.neiborMine += 1;
        }
      }
    }
  }

  isMine(x: number, y: number) {
    if (x < 0 || x >= this.rowCount || y < 0 || y >= this.columnCount)
      return false;
    const cell = this.cells[x][y];
    console.log('Cell', cell, cell.isMine);
    return cell.isMine;
  }

  @action
  exposeCell(x: number, y: number) {
    if (x < 0 || x >= this.rowCount || y < 0 || y >= this.columnCount) return;
    const cell = this.cells[x][y];
    if (cell.status !== CellStatus.UNEXPOSED) return;
    cell.setStatus(CellStatus.EXPOSED);
    this.unexposedCellCount -= 1;

    // Auto-expose surrounding cells if this cell is empty(0)
    if (cell.neiborMine === 0) {
      for (let i = 0; i < 8; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        this.exposeCell(nx, ny);
      }
    }
  }

  @action
  toggleMarkCell(x: number, y: number) {
    if (x < 0 || x > this.rowCount || y < 0 || y > this.columnCount) return;
    const cell = this.cells[x][y];

    if (cell.status === CellStatus.EXPOSED) return;
    if (cell.status === CellStatus.UNEXPOSED) {
      cell.setStatus(CellStatus.MARKED);
      this.markedCellCount += 1;
    } else {
      cell.setStatus(CellStatus.UNEXPOSED);
      this.markedCellCount -= 1;
    }
  }
}

export class CellEntity {
  @observable isMine: boolean;
  @observable status: CellStatus;
  @observable neiborMine: number;

  constructor(isMine: boolean) {
    this.isMine = isMine;
    this.status = CellStatus.UNEXPOSED;
    this.neiborMine = 0;
  }

  @action
  setStatus(status: CellStatus) {
    this.status = status;
  }
}

export class Game {
  @observable board: BoardEntity;
  @observable ended: boolean;

  constructor(rows: number = 8, cols: number = 8, mines: number = 5) {
    this.board = new BoardEntity(rows, cols, mines);
    this.ended = false;
  }

  canEnd() {
    return this.board.unexposedCellCount === this.board.mineCount;
  }

  @action
  exposeCell(x: number, y: number) {
    console.log('exposing (%d, %d)', x, y);
    if (this.board.isMine(x, y)) {
      this.ended = true;
      console.log('Exploded! You lose : (');
    } else {
      this.board.exposeCell(x, y);
      if (this.canEnd()) {
        this.ended = true;
        console.log('You win!');
      }
    }
  }

  @action
  reset() {
    this.board = new BoardEntity(
      this.board.rowCount,
      this.board.columnCount,
      this.board.mineCount
    );
    this.ended = false;
  }
}

export const game = new Game(8, 8, 5);

(window as any).game = game;
