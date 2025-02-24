import { Component, effect, inject, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BeerType } from '../../enums/beer-type';
import { Beer } from '../../classes/beer';
import { ApiRequestService } from '../../services/api-request.service';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-beer-form',
  imports: [ReactiveFormsModule, FormsModule, ModalComponent],
  templateUrl: './beer-form.component.html',
  styleUrl: './beer-form.component.css'
})
export class BeerFormComponent {
  beerToEdit: InputSignal<Beer | null> = input.required<Beer | null>();
  securityWord: InputSignal<string> = input<string>('');
  beerUpdated: OutputEmitterRef<void> = output();
  clearBeer: OutputEmitterRef<void> = output();

  apiRequestService: ApiRequestService = inject(ApiRequestService);

  formGroup: FormGroup;
  fb: FormBuilder = inject(FormBuilder)
  beerTypes: BeerType[] = Object.values(BeerType);
  errorMessage: string = "";

  isModalOpen: boolean = false;
  modalMessage: string = '';
  isNotification: boolean = false;

  constructor() {
    this.formGroup = this.fb.group({
      name: ["", [Validators.required]],
      type: ["", [Validators.required]],
      alcohol: ["", [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      ibu: ["", [Validators.required, Validators.pattern(/^\d+$/), Validators.max(120)]],
      image: ["", [Validators.required]],
      description: ["", []],
    })

    effect(() => {
      const beer = this.beerToEdit!();

      if (beer) {
        this.formGroup.patchValue({
          name: beer.name,
          type: beer.type,
          alcohol: beer.alcohol,
          ibu: beer.ibu,
          image: beer.image,
          description: beer.description,
        });
      } else {
        this.formGroup.reset();
      }
    })      
  }

  setTypeValue(type: string) {
    this.formGroup.patchValue({type});
  }

  takeFormValues(): Beer {
    const { name, type, alcohol, ibu, image, description } = this.formGroup.value;
    const beer: Beer = new Beer(name, type, alcohol, ibu, image, description);

    return beer;
  }

  createBeer() {
    if (this.formGroup.invalid) {
      this.errorMessage = this.getErrorMessage();
      return;
    }

    const beer: Beer = this.takeFormValues();

    this.apiRequestService.createBeer(beer, this.securityWord()).subscribe({
      next: () => {
        this.errorMessage = '';
        this.openNotificationModal('Cerveza creada con éxito');
        this.beerUpdated.emit();
        console.log('Cerveza creada exitosamente');            
      },
      error: (err) => {        
        console.error('Error al crear la cerveza:', err);
        this.openNotificationModal(`Ocurrió el siguiente error : ${err.error.error}`);
      },
    });
  }  

  editBeer() {        
    if (this.formGroup.invalid) {
      this.errorMessage = this.getErrorMessage();
      return;
    }

    const editedBeer: Beer = this.takeFormValues();        

    editedBeer._id = this.beerToEdit()!._id;

    this.apiRequestService.editBeer(editedBeer, this.securityWord()).subscribe({
      next: () => {
        this.errorMessage = '';
        this.openNotificationModal('Cerveza editada con éxito');
        this.beerUpdated.emit();
        console.log('Cerveza editada exitosamente');    
      },
      error: (err) => {
        console.error('Error al editar la cerveza:', err.error);
        this.openNotificationModal(`Ocurrió el siguiente error : ${err.error.error}`);
      },
    });
  }

  openNotificationModal(message: string): void {
    this.modalMessage = message;
    this.isNotification = true;    
    this.isModalOpen = true;
  }

  openEditModal(): void {
    this.modalMessage = `Esto editará el item : ${this.beerToEdit()!.name}` ;
    this.isModalOpen = true;
  }

  onConfirm(confirmation: boolean): void {
    if(confirmation) {
      this.editBeer(); 
    }

    this.isModalOpen = false;
    this.isNotification = false;
  }

  getErrorMessage(): string {
    for (const controlName in this.formGroup.controls) {
      const control = this.formGroup.get(controlName);
  
      if (control?.hasError('required')) {
        switch (controlName) {
          case 'name':
            return 'El campo "Nombre" es obligatorio.';
          case 'type':
            return 'El campo "Tipo" es obligatorio.';
          case 'alcohol':
            return 'El campo "Alcohol" es obligatorio.';
          case 'ibu':
            return 'El campo "IBU" es obligatorio.';
          case 'image':
            return 'El campo "URL de Imagen" es obligatorio.';
        }
      }
  
      if (controlName === 'alcohol' && control?.hasError('pattern')) {
        return 'El campo "Alcohol" debe ser un número válido (puede incluir decimales con un punto).';
      }
  
      if (controlName === 'ibu') {
    
        if (control?.hasError('pattern')) {
          return 'El campo "IBU" debe ser un número entero válido.';
        }

        if (control?.hasError('max')) {
          return 'El campo "IBU" debe ser menor o igual a 120.';
        }
      }
    }
  
    return '';
  }  

  formReset(): void {
    this.formGroup.reset();    
    this.clearBeer.emit();
  }
}
