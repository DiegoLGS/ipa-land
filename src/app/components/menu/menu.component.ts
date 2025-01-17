import { Component, inject } from '@angular/core';
import { Beer } from '../../classes/beer';
import { NgFor, NgIf } from '@angular/common';
import { ApiRequestService } from '../../services/api-request.service';

@Component({
  selector: 'app-menu',
  imports: [NgFor, NgIf],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  beers: Beer[] = [];

  constructor(private apiRequestService: ApiRequestService) { }

  ngOnInit(): void {
    const listOfBeers = this.apiRequestService.getBeers();

    listOfBeers.subscribe((data: Beer[]) => {
      this.beers = data;
    })
  }
}
