import { Component } from '@angular/core';
import { CarService } from '../../../services/car.service';
import { Car } from '../../../models/Car';

@Component({
  selector: 'app-cars-page',
  templateUrl: './cars-page.component.html',
  styleUrl: './cars-page.component.css'
})
export class CarsPageComponent {
  currentPage: number=0;
    totalPages!:number
    carsPerPage:number=8
    isloading:boolean=false
    totalCars!:number
    cars:Car[]=[]
      
      constructor(private carService:CarService){}
      ngOnInit(): void {
        this.isloading=true
        this.fetchResults()
       
      }
      fetchResults(){
        this.carService.getCars(this.currentPage,this.carsPerPage,(data)=>{
          this.isloading=false
          this.cars=data.items
          


         
        let result =JSON.parse(JSON.stringify(data)).totalItems/this.carsPerPage 
        
        if(Math.floor(result)!=result){
          result+=1
          result=Math.floor(result)

        }
        this.totalPages=result
        this.totalCars=data.totalItems
    
    
        })

      }
      prevPage() {
        this.currentPage-=1
       
          this.fetchResults()
    
        
       
        
        }
        goToPage(page: number) {
          this.currentPage=page
         
            this.fetchResults()
    
          
        }
        nextPage() {
          this.currentPage+=1
        
          this.fetchResults()
    
        
        }


        editCar(arg0: string|number) {
          throw new Error('Method not implemented.');
          }
          deleteCar(id: number) {
          if(confirm('Are you sure you want to delete this car ')){
            this.isloading=true
            this.carService.deleteCar(id,()=>{

              this.isloading=false
              this.cars= this.cars.filter(c=>c.id!=id)
              

            })

          }
          }

}
