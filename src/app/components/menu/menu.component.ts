import { Component, inject } from '@angular/core';
import { Beer } from '../../classes/beer';
import { NgFor } from '@angular/common';
import { ApiRequestService } from '../../services/api-request.service';

@Component({
  selector: 'app-menu',
  imports: [NgFor],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  beers: Beer[] = [];

  apiRequest = inject(ApiRequestService);

  constructor() {    

    const ipa: Beer = new Beer("1", "Ipa Soul", "IPA", 4.6, 41, 'https://img.freepik.com/free-photo/frothy-beer-pint-glass-refreshing-generated-by-ai_188544-34548.jpg?t=st=1736896842~exp=1736900442~hmac=96d87bf04d5d1a955eb23fe7b0bcd0f5cd5d31ee58bb9fd2b2167a683e2a5eba&w=1380',"Una cerveza ámbar con notas cítricas y tropicales, un amargor equilibrado y un final refrescante. Perfecta para almas aventureras.");
    this.beers.push(ipa);
    
  }

  ngOnInit(): void {
    const listOfBeers = this.apiRequest.getBeers();

    listOfBeers.subscribe(data => {
      console.log(data)
    })
  }
}
