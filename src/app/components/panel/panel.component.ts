import { Component, Input, input, ViewChild } from '@angular/core';
import { Beer } from '../../classes/beer';
import { BeerFormComponent } from "../beer-form/beer-form.component";
import { BeerTableComponent } from "../beer-table/beer-table.component";

@Component({
  selector: 'app-panel',
  imports: [BeerFormComponent, BeerTableComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {  
  @ViewChild(BeerTableComponent) beerTable!: BeerTableComponent;

  beerToEdit: Beer | null = null;

  securityWord: string = '';
  
  setSecurityWord(securityWord: string) {
    this.securityWord = securityWord;
  }

  onBeerUpdated() {
    if (this.beerTable) {
      this.beerTable.getAllBeers();
    }
  }
}
