/**
 * Model for the Contact Object
 */
export class Contact {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  contactNumbers: ContactNumber[] = [new ContactNumber(), new ContactNumber(), new ContactNumber()];
  isFavorite: boolean = false;
}

/**
 * Model for the Contact Number field
 */
export class ContactNumber {
  type: string = '';
  number: string = '';
}
