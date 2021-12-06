import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  public _url_contacts = 'api';

  constructor(private _http: HttpClient) {}

  public getContactList(pageNo: number = 1): Observable<Contact[]> {
    const url = `${this._url_contacts}/contacts?page=${pageNo}`;
    return this._http.get<Contact[]>(url);
  }

  public saveContact(postJson: any): Observable<any> {
    const url = `${this._url_contacts}/contacts`;
    const headers = this.AuthHeader();
    return this._http.post(url, postJson, headers);
  }

  public updateContact(putJson: any, id: number): Observable<any> {
    const url = `${this._url_contacts}/contacts/${id}`;
    const headers = this.AuthHeader();
    return this._http.put(url, putJson, headers);
  }

  public deleteContact(id: number): Observable<any> {
    const url = `${this._url_contacts}/contacts/${id}`;
    const headers = this.AuthHeader();
    return this._http.delete(url, headers);
  }

  public AuthHeader() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return { headers: headers };
  }
}
