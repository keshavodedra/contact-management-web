import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { BasicValidators } from 'src/app/shared/validators/basicValidators';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {
  @Input() public mode: string = '';
  @Input() public data: any;
  @Output() public closeContactModal = new EventEmitter();
  @Output() public submitContact = new EventEmitter();
  successMessage: string = 'Contact has been saved';
  showSuccessMessage: boolean = false;
  addErrorMessage: string = '';
  public contactForm!: FormGroup;
  public pristineFlag$: BehaviorSubject<any> = new BehaviorSubject(true);
  isLoadingContact: boolean = false;

  constructor(
    public fb: FormBuilder,
    private _contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      id: [this.data?.id],
      first_name: [this.data?.first_name, [Validators.required]],
      last_name: [this.data?.last_name, [Validators.required]],
      email: [this.data?.email, BasicValidators.email],
      phone: [this.data?.phone, [Validators.required, BasicValidators.phoneNo]],
    });
  }

  /*
    Save Contacts
  */
  saveContact() {
    this.pristineFlag$.next(false);
    if (this.contactForm.valid) {
      this.isLoadingContact = true;
      const postJson = this.getPostJson();
      if (this.contactForm.get('id')?.value) {
        this.updateContact(postJson);
        return;
      }
      this._contactService.saveContact(postJson).subscribe(
        (res) => {
          if (res) {
            this.saveSuccess();
          }
        },
        (error) => {
          this.handleError(error);
        }
      );
    }
  }

  /*
    Make post body to save contact
  */
  getPostJson() {
    let postJson = {
      contact: {
        first_name: this.contactForm.get('first_name')?.value,
        last_name: this.contactForm.get('last_name')?.value,
        email: this.contactForm.get('email')?.value,
        phone: this.contactForm.get('phone')?.value,
      },
    };
    return postJson;
  }

  /*
    Update Contacts
  */
  updateContact(putJson: any) {
    this._contactService
      .updateContact(putJson, this.contactForm.controls['id'].value)
      .subscribe(
        (res) => {
          if (res) {
            this.saveSuccess();
          }
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  /*
    Close popup
  */
  saveSuccess() {
    this.showSuccessMessage = true;
    this.isLoadingContact = false;
    setTimeout(() => {
      this.submitContact.emit(true);      
    }, 1500);
  }

  /*
    Show error from API if any
  */
  handleError(error: any) {
    this.isLoadingContact = false;
    if (error.error['email']) {
      this.addErrorMessage = 'Email has already been taken';
    }
  }

  closeModal() {
    this.closeContactModal.emit(true);
  }
}
