import { observable } from 'mobx';

export enum CellStatus {
  DEFAULT = 'DEFAULT',
  MARKED = 'MARKED',
  EXPOSED = 'EXPOSED'
}

const dx = [-1, 0, 1, 0, -1, 1, -1, 1];
const dy = [0, -1, 0, 1, -1, 1, 1, -1];

export class BoardEntity {
  cells: CellEntity[][];
  rowCount: number;
  columnCount: number;

  constructor(rowCount: number, columnCount: number) {
    this.rowCount = rowCount;
    this.columnCount = columnCount;
    this.cells = Array(rowCount)
      .fill(0)
      .map(_ =>
        Array(columnCount)
          .fill(0)
          .map(__ => new CellEntity(false))
      );
  }

  computeNeiborMine() {
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
}

export class CellEntity {
  readonly isMine: boolean;
  @observable status: CellStatus;
  @observable neiborMine: number;

  constructor(isMine: boolean) {
    this.isMine = isMine;
    this.status = CellStatus.DEFAULT;
    this.neiborMine = 0;
  }
}

export const boardEntity = new BoardEntity(8, 8);

(window as any).boardEntity = boardEntity;
