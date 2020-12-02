import { Component, OnInit } from '@angular/core';
import { BlockState, DataStoreService } from './data-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-minesweeper';
  boardMatrix: BlockState[][];

  constructor(private dataService: DataStoreService) {
    this.boardMatrix = this.dataService.getBoard();
  }

  onBlockClick(blockState: BlockState) {
    this.dataService.updateBoardState({xPos: blockState.xPos, yPos: blockState.yPos});
  }

  ngOnInit() {
  }
}
