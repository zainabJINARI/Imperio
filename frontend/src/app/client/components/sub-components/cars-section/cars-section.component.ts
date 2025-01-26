import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../../services/car.service';
import { Car } from '../../../../models/Car';

@Component({
  selector: 'app-cars-section',
  templateUrl: './cars-section.component.html',
  styleUrl: './cars-section.component.css'
})
export class CarsSectionComponent  implements OnInit{
  isloading:boolean=false
  cars:Car[]=[]
  
  constructor(private carService:CarService){}
  ngOnInit(): void {
    this.isloading=true
    this.carService.getCars(0,8,true,(data:any)=>{
      this.isloading=false
      this.cars=data.items
      console.log('items found',this.cars)


    })
  }

}
