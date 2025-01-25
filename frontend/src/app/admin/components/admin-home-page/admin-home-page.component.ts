import { Component } from '@angular/core';
import { Car } from '../../../models/Car';
import { CarService } from '../../../services/car.service';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrl: './admin-home-page.component.css'
})
export class AdminHomePageComponent {

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
          deleteCar(arg0: string|number) {
          throw new Error('Method not implemented.');
          }

}
