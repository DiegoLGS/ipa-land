import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
  @Output() beerToEdit = new EventEmitter<Beer | null>();
  @Input() securityWord: string = '';

  apiRequestService: ApiRequestService = inject(ApiRequestService);
  beers: Beer[] = [];

  isModalOpen: boolean = false;
  beerToDelete: Beer | null = null;
  modalTitle: string = '';
  modalMessage: string = '';

  ngOnInit(): void {
    const listOfBeers = this.apiRequestService.getBeers();

    listOfBeers.subscribe((data: Beer[]) => {
      this.beers = data;
      console.log(this.beers)
    })
  }

  deleteItem() {    
    if(this.beerToDelete && this.beerToDelete._id) {
      this.apiRequestService.deleteBeer(this.beerToDelete._id, this.securityWord)
      .subscribe({
        next: () => {
          console.log('Cerveza eliminada exitosamente');
          
          this.beers = this.beers.filter(beer => beer._id !== this.beerToDelete!._id);
      },
      error: (err) => {
        console.error('Error al eliminar la cerveza:', err.error);
      },
      });
    }
  }

  openDeleteModal(beer: Beer) {
    this.modalMessage = `Esto borrará el item : ${beer.name}` ;
    this.isModalOpen = true;
    this.beerToDelete = beer;
  }

  onConfirm(confirmation: boolean) {
    if(confirmation) {
      this.deleteItem(); 
    }

    this.isModalOpen = false;
  } 
}
