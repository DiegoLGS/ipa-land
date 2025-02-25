import { ChangeDetectionStrategy, Component, Input, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  isOpen: InputSignal<boolean> = input<boolean>(false);
  message: InputSignal<string> = input<string>('');
  isNotification: InputSignal<boolean> = input<boolean>(false);

  confirm: OutputEmitterRef<boolean> = output<boolean>();

  confirmAction(confirmation: boolean) {
    this.confirm.emit(confirmation);        
  }
}