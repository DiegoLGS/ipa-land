import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() message: string = '';

  @Output() confirm = new EventEmitter<boolean>();

  confirmAction(confirmation: boolean) {
    this.confirm.emit(confirmation);
  }
}