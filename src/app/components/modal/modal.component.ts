import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  isOpen = input<boolean>(false);
  message = input<string>('');
  isNotification = input<boolean>(false);

  confirm = output<boolean>();

  confirmAction(confirmation: boolean) {
    this.confirm.emit(confirmation);        
  }
}