import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent {

  @Input('contact') contact: Contact = new Contact();
  @Output() action = new EventEmitter();

  constructor() { }

  actionCTA(action: string){
    switch (action) {
      case 'edit':
      case 'delete':
      case 'view':
          this.action.emit(action);
        break;
      case 'favorite':
          let temp = this.contact.isFavorite ? 'removeFavorite' : 'addFavorite';
          this.action.emit(temp);
        break;

      default:
          this.action.emit('');
        break;
    }
  }

}
