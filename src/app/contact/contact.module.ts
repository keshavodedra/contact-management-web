import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactService } from './services/contact.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactHistoryComponent } from './contact-history/contact-history.component';
import { PaginationRowComponent } from '../shared/pagination-row/pagination-row.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

@NgModule({
  declarations: [
    ContactListComponent,
    ContactDetailComponent,
    ContactHistoryComponent,
    PaginationRowComponent,
    SpinnerComponent    
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ContactService],
})
export class ContactModule {}
