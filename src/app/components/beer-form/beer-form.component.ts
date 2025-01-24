import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BeerType } from '../../enums/beer-type';

@Component({
  selector: 'app-beer-form',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './beer-form.component.html',
  styleUrl: './beer-form.component.css'
})
export class BeerFormComponent {
  @Input() editId: string = '';

  formGroup: FormGroup;
  fb: FormBuilder = inject(FormBuilder)
  beerTypes = Object.values(BeerType);

  constructor() {
    this.formGroup = this.fb.group({
      name: ["", [Validators.required]],
      type: ["", [Validators.required]],
      alcohol: ["", [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      ibu: ["", [Validators.required, Validators.pattern(/^\d+$/)]],
      image: ["", [Validators.required]],
      description: ["", []],
    })

  }

  createBeer() {
    
  }

  editBeer() {

  }

}
