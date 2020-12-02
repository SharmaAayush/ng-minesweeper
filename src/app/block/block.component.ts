import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlockState } from '../data-store.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  @Input() blockState: BlockState;
  @Output() blockClick = new EventEmitter<BlockState>();

  constructor() { }

  onBlockClick() {
    if (!this.blockState.isExposed) {
      this.blockClick.emit(this.blockState);
    }
  }

  ngOnInit(): void {
  }

}
