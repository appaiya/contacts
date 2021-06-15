import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { ContactsStore } from '../store/contacts.store';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private contactsStore: ContactsStore) { }

  /**
   * Function will call the store addContact function to add the new contact into the list
   * @param contactObj
   */
  addNewContact(contactObj: Contact){
    contactObj.id = this.contactsStore.getContacts().length + 1;
    this.contactsStore.addContact(contactObj);
  }

  /**
   * Funtion will call the Store function to update the favorite status
   * @param contactObj
   */
  addToFav(contactObj: Contact){
    this.contactsStore.addToFavorite(contactObj);
  }

  /**
   * Funtion will call the Store function to update the favorite status
   * @param contactObj
   */
  removeFromFav(contactObj: Contact){
    this.contactsStore.removeFromFavorite(contactObj);
  }

  /**
   * Funtion will call the Store to remove the particular Contact
   * @param contactObj
   */
  removeContact(contactObj: Contact){
    this.contactsStore.removeContact(contactObj);
  }


}
