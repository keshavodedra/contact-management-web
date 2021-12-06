import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ContactService } from '../services/contact.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';
import { ContactHistoryComponent } from '../contact-history/contact-history.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  currentPage: number = 1;
  isLoadingContacts: boolean = false;
  private subscriptions: Subscription[] = [];
  contactList: any = [];
  showModal: boolean = false;
  modalMode: string = '';
  currentItem: any;
  showHistoryModal: boolean = false;

  totalCount = 0;
  currentPage$: BehaviorSubject<any> = new BehaviorSubject(1);
  totalRecords$: BehaviorSubject<any> = new BehaviorSubject(0);
  totalPages = 1;

  constructor(
    private _contactService: ContactService,
    private _modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.loadContacts(this.currentPage);
  }

  /*
    Get Contact List
  */
  loadContacts(page = 1): void {
    this.isLoadingContacts = true;
    const sub = this._contactService.getContactList(page).subscribe(
      (response) => {
        if (response && response['contacts']) {
          this.isLoadingContacts = false;
          this.contactList = response['contacts'];
          if (response['meta']) {
            this.totalPages = response['meta'].total_pages;
            this.currentPage = response['meta'].current_page;
            this.currentPage$.next(this.currentPage);
            this.totalCount = response['meta'].total_count;
            this.totalRecords$.next(this.totalCount);
          }
        }
      },
      (error) => {
        this.isLoadingContacts = false;
      }
    );
    this.subscriptions.push(sub);
  }

  /*
    Open Pop up for Add/Edit Contacts
  */
  addEditContact(mode = 'add', data?: any) {
    this.modalMode = mode;
    this.currentItem = data;
    this.showModal = true;
  }

  /*
    Save Contact method to close the model and rebind the contact list
  */
  saveContact() {
    this.showModal = false;
    this.loadContacts(this.currentPage);
  }

  /*
    Open confirmation popup using angular bootstrap method
  */
  openConfirmDeleteModal(id: number): void {
    const confirmModal = this._modalService.show(ConfirmationDialogComponent);
    const title = 'Are you sure want to delete this contact?';
    confirmModal!.content!.title = title;
    const confirmSubscription = confirmModal!.content!.event.subscribe(
      (confirm) => {
        if (confirm) {
          this.deleteContact(id, confirmModal);
        }
      }
    );
    this.subscriptions.push(confirmSubscription);
  }

  /*
    Delete Contact after confirmation
  */
  deleteContact(id: number, modal: BsModalRef): void {
    const sub = this._contactService.deleteContact(id).subscribe((response) => {
      modal.hide();
      this.saveContact();
    });
    this.subscriptions.push(sub);
  }

  viewContactHistory(data: any) {
    this.currentItem = data;
    this.showHistoryModal = true;
  }

  loadPage(page: number): void {
    if (this.currentPage !== page) {
      this.loadContacts(page);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.map((sub) => sub.unsubscribe());
  }
}
