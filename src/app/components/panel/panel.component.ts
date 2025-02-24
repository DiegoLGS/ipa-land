import { Component, inject, Input, input, ViewChild } from '@angular/core';
import { Beer } from '../../classes/beer';
import { BeerFormComponent } from "../beer-form/beer-form.component";
import { BeerTableComponent } from "../beer-table/beer-table.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-panel',
  imports: [BeerFormComponent, BeerTableComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {  
  @ViewChild(BeerTableComponent) beerTable!: BeerTableComponent;

  authService: AuthService = inject(AuthService);
  beerToEdit: Beer | null = null;
  securityWord: string = '';
    
  setSecurityWord(securityWord: string) {
    this.securityWord = securityWord;
  }

  onBeerUpdated() {
    console.log("CERVEZA EDITADA O CREADA");
    if (this.beerTable) {
      this.beerTable.getAllBeers();
    }
  }

  clearBeer() {
    this.beerToEdit = null;
  }
}
