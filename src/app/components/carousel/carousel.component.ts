import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  @ViewChild('carousel') carousel!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    let index: number = 0;

    setInterval(() => {
      const slides = this.carousel.nativeElement.children;

      if (slides.length > 0) {
        index = (index < slides.length - 1) ? index + 1 : 0;
        
        this.renderer.setStyle(
          this.carousel.nativeElement,
          'transform',
          `translateX(-${index * 100}%)`
        );
      }
    }, 2000);
  }
}
