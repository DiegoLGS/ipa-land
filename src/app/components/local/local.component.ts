import { Component } from '@angular/core';
import { ScheduleComponent } from "../schedule/schedule.component";
import { CarouselComponent } from "../carousel/carousel.component";

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css'],
  imports: [ScheduleComponent, CarouselComponent]
})
export class LocalComponent {
  
}
