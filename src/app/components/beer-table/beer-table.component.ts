import { Component, inject, input, output } from '@angular/core';
import { Beer } from '../../classes/beer';
import { ApiRequestService } from '../../services/api-request.service';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-beer-table',
  imports: [ModalComponent],
  templateUrl: './beer-table.component.html',
  styleUrl: './beer-table.component.css'
})
export class BeerTableComponent {
  beerToEdit = output<Beer | null>();
  securityWord = input<string>('');

  apiRequestService: ApiRequestService = inject(ApiRequestService);
  beers: Beer[] = [];
  filteredBeers: Beer[] = [];

  isModalOpen: boolean = false;
  beerToDelete: Beer | null = null;
  modalMessage: string = '';
  isNotification: boolean = false;

  ngOnInit(): void {
    this.getAllBeers();
  }

  getAllBeers() {
    this.apiRequestService.getBeers().subscribe((data: Beer[]) => {
      this.beers = data;
      this.filteredBeers = data;
    })
  }

  deleteBeer(): void {    
    if(this.beerToDelete && this.beerToDelete._id) {
      this.apiRequestService.deleteBeer(this.beerToDelete._id, this.securityWord())
      .subscribe({
        next: () => {
          this.getAllBeers();
          console.log('Cerveza eliminada exitosamente');
          
          this.beers = this.beers.filter(beer => beer._id !== this.beerToDelete!._id);
      },
      error: (err) => {
        console.error('Error al eliminar la cerveza:', err.error);
        this.openNotificationModal(err.error.error);
      },
      });
    }
  }

  openNotificationModal(error: string): void {
    this.modalMessage = `Ocurrió el siguiente error : ${error}` ;
    this.isNotification = true;    
    this.isModalOpen = true;
  }

  openDeleteModal(beer: Beer): void {
    this.modalMessage = `Esto borrará el item : ${beer.name}` ;
    this.isModalOpen = true;
    this.beerToDelete = beer;
  }

  onConfirm(confirmation: boolean): void {
    if(confirmation) {
      this.deleteBeer(); 
    }

    this.isModalOpen = false;
    this.isNotification = false;
  } 

  filterBeers(filter: string): void {
    filter = filter.trim();

    if(filter !== '') {
      filter = filter.toLowerCase();
      this.filteredBeers = this.beers.filter(beer => beer.name.toLowerCase().includes(filter) || beer.type.toLowerCase().includes(filter))
      
    } else {
      this.filteredBeers = this.beers;
    }
  }
}
