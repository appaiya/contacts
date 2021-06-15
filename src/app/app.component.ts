import { Component, OnInit } from '@angular/core';
import { Contact } from './models/contact.model';
import { ContactsService } from './service/contacts.service';
import { ContactsStore } from './store/contacts.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  contactObj: Contact = new Contact();
  contactTypes = [{value: 'mobile', type: 'Mobile'}, {value: 'phone', type: 'Phone'}, {value: 'landline', type: 'Landline'}];
  action: string = '';
  errorValue: string = '';
  searchVal: string = '';

  constructor(
    public contactService: ContactsService,
    public contactsStore: ContactsStore
  ){}

  ngOnInit(){
    // Adding a Contact for UI purpose
    this.contactService.addNewContact({
      id: 1,
      firstName: 'Ram',
      lastName: 'A',
      isFavorite: true,
      contactNumbers: [
        {
          type: 'mobile',
          number: '9876543210'
        },
        {
          type: 'phone',
          number: '8976890987'
        },
        {
          type: 'landline',
          number: '0427234567'
        }
      ]
    });
  }

  /**
   * This function will trigger from the Card component emit event.
   * @param contactObj will have the contact
   * @param event will be the string value eg., 'edit', 'view', etc.,
   */
  cardAction(contactObj: Contact,event: string){
    switch (event) {
      case 'edit':
      case 'view':
        this.action = event;
        this.contactObj = new Contact();
        this.contactObj = contactObj;
        break;
      case 'delete':
        this.contactService.removeContact(contactObj);
        break;
      case 'addFavorite':
        this.contactService.addToFav(contactObj);
        break;
      case 'removeFavorite':
        this.contactService.removeFromFav(contactObj);
        break;

      default:
        break;
    }
  }

  /**
   * To add new Contact.
   */
  add(){
    this.action = 'add';
    this.errorValue = '';
    this.contactObj = new Contact();
  }

  /**
   * On Sumbmitting the form, this function will trigger.
   * This Function will Create New / Modify the Contact from the ContactList
   */
  addNewContactCTA(){
    this.errorValue = '';
    if(this.validationCTA()){
      this.contactService.addNewContact(this.contactObj);
      this.contactObj = new Contact();
      this.action = '';
    }
  }

  /**
   * @private Function to validate the Form.
   * @returns boolean, if the form is valid then reurn `true` else `false`
   */
  private validationCTA(): boolean{
    if(this.contactObj.firstName == ''){
      this.errorValue = 'Please fill the First Name';
    } else if(!this.contactObj.contactNumbers.filter(c => c.type != '' && c.number != '').length){
      this.errorValue = 'Please fill atleast one Contact Number';
    } else {
      this.errorValue = '';
    }
    return this.errorValue == '';
  }
}
