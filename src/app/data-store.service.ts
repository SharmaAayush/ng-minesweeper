import { Injectable } from '@angular/core';

export interface BlockState {
  xPos: number;
  yPos: number;
  isBomb: boolean;
  adjacentBombs: number;
  isExposed: boolean;
}

const generateEmptyBoard = function(x: number = 100, y: number = 100): BlockState[][] {
  let data: BlockState[][] = [];
  for (let i = 0; i < x; i++) {
    data[i] = [];
    for (let j = 0; j < y; j++) {
      data[i][j] = {
        xPos: i,
        yPos: j,
        isBomb: false,
        adjacentBombs: 0,
        isExposed: false
      };
    }
  }
  return data;
}

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  private data: BlockState[][];

  private boardSize = {
    x: 10,
    y: 10
  }

  private getAdjacentBlockCombos(block: BlockState) {
    let combos: {xPos: number, yPos: number}[] = [];
    if (block.xPos > 0) {
      combos.push({xPos: block.xPos - 1, yPos: block.yPos});
      if (block.yPos > 0) {
        combos.push({xPos: block.xPos - 1, yPos: block.yPos - 1});
      }
      if (block.yPos < this.boardSize.y - 1) {
        combos.push({xPos: block.xPos - 1, yPos: block.yPos + 1});
      }
    }
    if (block.xPos < this.boardSize.x - 1) {
      combos.push({xPos: block.xPos + 1, yPos: block.yPos});
      if (block.yPos > 0) {
        combos.push({xPos: block.xPos + 1, yPos: block.yPos - 1});
      }
      if (block.yPos < this.boardSize.y - 1) {
        combos.push({xPos: block.xPos + 1, yPos: block.yPos + 1});
      }
    }
    if (block.yPos > 0) {
      combos.push({xPos: block.xPos, yPos: block.yPos - 1});
    }
    if (block.yPos < this.boardSize.y - 1) {
      combos.push({xPos: block.xPos, yPos: block.yPos + 1});
    }
    return combos;
  }

  private updateAdjacentBlocks(block: BlockState): void {
    if (!block.isBomb) {
      return;
    }
    let combos: {xPos: number, yPos: number}[] = this.getAdjacentBlockCombos(block);
    for (let i = 0; i < combos.length; i++) {
      const combo = combos[i];
      this.data[combo.xPos][combo.yPos].adjacentBombs++;
    }
  }

  resetBoard() {
    for (let i = 0; i < this.boardSize.x; i++) {
      for (let j = 0; j < this.boardSize.y; j++) {
        this.data[i][j].isBomb = false;
        this.data[i][j].isExposed = false;
        this.data[i][j].adjacentBombs = 0;
      }
    }
  }

  updateBoardState(stateToIgnore?: {xPos: number, yPos: number}) {
    this.resetBoard();
    for (let i = 0; i < this.boardSize.x; i++) {
      for (let j = 0; j < this.boardSize.y; j++) {
        const flag = Math.random();
        this.data[i][j].isBomb = flag > 0.75;
        if (stateToIgnore && i == stateToIgnore.xPos && j == stateToIgnore.yPos) {
          this.data[i][j].isBomb = false;
        }
        this.updateAdjacentBlocks(this.data[i][j]);
        this.data[i][j].isExposed = true;
      }
    }
  }

  getBoard(): BlockState[][] {
    return this.data;
  }

  constructor() {
    this.data = generateEmptyBoard(this.boardSize.x, this.boardSize.y);
  }
}
