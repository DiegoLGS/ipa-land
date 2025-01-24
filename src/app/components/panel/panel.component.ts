import { Component, inject } from '@angular/core';
import { ApiRequestService } from '../../services/api-request.service';
import { Beer } from '../../classes/beer';
import { BeerFormComponent } from "../beer-form/beer-form.component";

@Component({
  selector: 'app-panel',
  imports: [BeerFormComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {
  apiRequestService: ApiRequestService = inject(ApiRequestService);
  beers: Beer[] = [];
  beerToEdit: Beer | null = null;
  securityWord: string = '';

  isModalOpen: boolean = false;
  beerToDelete: Beer | null = null;

  constructor() { }

  ngOnInit(): void {
    const listOfBeers = this.apiRequestService.getBeers();

    listOfBeers.subscribe((data: Beer[]) => {
      this.beers = data;
      console.log(this.beers)
    })
  }

  openDeleteModal(beer: Beer) {
    this.isModalOpen = true;
    this.beerToDelete = beer;
  }
  
  closeDeleteModal() {
    this.isModalOpen = false;
    this.beerToDelete = null;
  }
  
  confirmDelete() {
    if (this.beerToDelete) {
      this.deleteItem(this.beerToDelete);
      this.closeDeleteModal();
    }
  }

  deleteItem(beerToDelete: Beer) {
    console.log("Item a eliminar: ", beerToDelete._id)
    this.apiRequestService.deleteBeer(beerToDelete._id, this.securityWord)
    .subscribe({
      next: () => {
        console.log('Cerveza eliminada exitosamente');
        
        this.beers = this.beers.filter(beer => beer._id !== beerToDelete._id);
      },
      error: (err) => {
        console.error('Error al eliminar la cerveza:', err.error);
      },
    });
  }

  setSecurityWord(securityWord: string) {
    this.securityWord = securityWord;
  }
}
