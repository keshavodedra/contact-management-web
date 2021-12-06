import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-contact-history',
  templateUrl: './contact-history.component.html',
  styleUrls: ['./contact-history.component.scss'],
})
export class ContactHistoryComponent implements OnInit {
  @Input() public data: any;
  @Output() public closeContactHistoryModal = new EventEmitter();

  constructor() {}

  ngOnInit() {
    // console.log(this.data);
  }

  getchange(item, name){
    if(item?.old_values?.[name] == item?.new_values?.[name]){
      return false;
    }
    return true;
  }

  closeModal() {
    this.closeContactHistoryModal.emit(true);
  }
}
