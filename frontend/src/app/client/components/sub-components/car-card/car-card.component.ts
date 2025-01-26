import { Component, Input } from '@angular/core';
import { Car } from '../../../../models/Car';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css'
})

export class CarCardComponent  {

  @Input()
  car?:Car

 


 

}
