import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BeerType } from '../../enums/beer-type';
import { Beer } from '../../classes/beer';
import { ApiRequestService } from '../../services/api-request.service';

@Component({
  selector: 'app-beer-form',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './beer-form.component.html',
  styleUrl: './beer-form.component.css'
})
export class BeerFormComponent {
  @Input() beerToEdit: Beer | null = null;
  @Input() securityWord: string = '';

  apiRequestService: ApiRequestService = inject(ApiRequestService);

  formGroup: FormGroup;
  fb: FormBuilder = inject(FormBuilder)
  beerTypes = Object.values(BeerType);
  errorMessage: string = "";

  constructor() {
    this.formGroup = this.fb.group({
      name: ["", [Validators.required]],
      type: ["", [Validators.required]],
      alcohol: ["", [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      ibu: ["", [Validators.required, Validators.pattern(/^\d+$/), Validators.max(120)]],
      image: ["", [Validators.required]],
      description: ["", []],
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['beerToEdit'] && this.beerToEdit) {
      this.formGroup.patchValue({
        name: this.beerToEdit.name,
        type: this.beerToEdit.type,
        alcohol: this.beerToEdit.alcohol,
        ibu: this.beerToEdit.ibu,
        image: this.beerToEdit.image,
        description: this.beerToEdit.description,
      });
    } else {
      this.formGroup.reset();
    }
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

    this.apiRequestService.createBeer(beer, this.securityWord).subscribe({
      next: () => {
        this.errorMessage = '';
        console.log('Cerveza creada exitosamente');            
      },
      error: (err) => {
        console.log(this.formGroup.value)
        console.error('Error al crear la cerveza:', err);
      },
    });
  }  

  editBeer(beer: Beer) {        
    if (this.formGroup.invalid) {
      this.errorMessage = this.getErrorMessage();
      return;
    }

    const editedBeer: Beer = this.takeFormValues();        

    editedBeer._id = beer._id;

    this.apiRequestService.editBeer(editedBeer, this.securityWord).subscribe({
      next: () => {
        this.errorMessage = '';
        console.log('Cerveza editada exitosamente');    
      },
      error: (err) => {
        console.error('Error al editar la cerveza:', err.error);
      },
    });
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

}
