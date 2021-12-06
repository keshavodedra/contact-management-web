import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  title: string = '';
  errorMessage: string = '';
  isPosting = false;
  public event: EventEmitter<boolean> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}

  confirm(): void {
    this.event.emit(true);
  }
}
