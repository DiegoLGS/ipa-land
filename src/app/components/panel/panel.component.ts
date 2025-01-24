import { Component, inject } from '@angular/core';
import { ApiRequestService } from '../../services/api-request.service';
import { Beer } from '../../classes/beer';

@Component({
  selector: 'app-panel',
  imports: [],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {
  apiRequestService: ApiRequestService = inject(ApiRequestService);
    beers: Beer[] = [];
  
    constructor() { }
  
    ngOnInit(): void {
      const listOfBeers = this.apiRequestService.getBeers();
  
      listOfBeers.subscribe((data: Beer[]) => {
        this.beers = data;
        console.log(this.beers)
      })
    }

    editItem(id: string) {
      console.log("Item a editar: ", id)
    }
    
    deleteItem(id: string) {
      console.log("Item a eliminar: ", id)
    }
}
