import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable()
export class ContactsStore {

  private readonly _contactList = new BehaviorSubject<Contact[]>([]);

  readonly contacts = this._contactList.asObservable();

  constructor() {}

  /**
   * @public Function to get the Available Contact List
   */
  getContacts(): Contact[]{
    return this._contactList.getValue();
  }

  /**
   * @private Function to Add/Update Contact details
   */
  private _setContact(contacts: Contact[]): void{
    this._contactList.next(contacts);
  }

  /**
   * Function to add New Contact in the list
   * @param contactObj
   */
  addContact(contactObj: Contact){
    this._setContact([...this.getContacts(), contactObj])
  }

  /**
   * Function to delete a contact from the list
   * @param contactObj
   */
  removeContact(contactObj: Contact){
    let contacts = this.getContacts().filter(c => c.id != contactObj.id);
    this._setContact(contacts);
  }

  /**
   * Function to Update/Modify the ContactList
   * @param contactObj
   */
  editContact(contactObj: Contact){
    let contacts = this.getContacts().map( c => c.id == contactObj.id ? contactObj : c);
    this._setContact(contacts);
  }

  /**
   * To Add a particular contact as favorites
   * @param contactObj
   */
  addToFavorite(contactObj: Contact){
    let contacts = this.getContacts().map( c => c.id == contactObj.id ? {...contactObj, ...{isFavorite: true}} : c);
    this._setContact(contacts);
  }

  /**
   * To Remove a particular contact from favorites
   * @param contactObj
   */
  removeFromFavorite(contactObj: Contact){
    let contacts = this.getContacts().map( c => c.id == contactObj.id ? {...contactObj, ...{isFavorite: false}} : c);
    this._setContact(contacts);
  }

}
