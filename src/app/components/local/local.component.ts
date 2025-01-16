import { Component } from '@angular/core';

@Component({
  selector: 'app-local',
  imports: [],
  templateUrl: './local.component.html',
  styleUrl: './local.component.css'
})
export class LocalComponent {
  
  ngOnInit(): void {

    const carousel: HTMLElement = document.getElementById("carousel")!;
    const slides: HTMLCollection = carousel?.children;
    let index: number = 0;

    if(slides) {
      setInterval (() => {        
        index = (index < slides.length - 1) ? index + 1 : 0;
        carousel.style.transform = `translateX(-${index * 100}%)`;
        
      }, 2000);
      
    }
  }

}
