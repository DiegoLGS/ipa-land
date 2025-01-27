import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Beer } from '../../classes/beer';
import { ApiRequestService } from '../../services/api-request.service';

@Component({
  selector: 'app-beer-table',
  imports: [],
  templateUrl: './beer-table.component.html',
  styleUrl: './beer-table.component.css'
})
export class BeerTableComponent {
  @Output() beerToEdit = new EventEmitter<Beer | null>();

  apiRequestService: ApiRequestService = inject(ApiRequestService);
  beers: Beer[] = [];
  securityWord: string = '';

  isModalOpen: boolean = false;
  beerToDelete: Beer | null = null;

  ngOnInit(): void {
    const listOfBeers = this.apiRequestService.getBeers();

    listOfBeers.subscribe((data: Beer[]) => {
      this.beers = data;
      console.log(this.beers)
    })
  }

  deleteItem(beerToDelete: Beer) {    
    if(beerToDelete._id) {
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
}
