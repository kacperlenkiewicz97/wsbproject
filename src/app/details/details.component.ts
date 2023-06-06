import { Component, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  @Input() detailsName = '';
  @Input() detailsPrice = 0;

  @Output() showCheaperProductsEvent = new EventEmitter<number>();

  constructor() {}

  showCheaperProducts() {
    if (this.detailsPrice !== 0) {
      this.showCheaperProductsEvent.emit(this.detailsPrice);
    }
  }

}


