import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {

  @Input() deleteAcno:any

  //user defined oncancel event
  @Output() onCancel= new EventEmitter()
  @Output() onDelete=new EventEmitter()

  cancel(){
    this.onCancel.emit() //emits an event containing given value

  }
  
  deleteFromChild(){
      this.onDelete.emit()
  }
  

}
