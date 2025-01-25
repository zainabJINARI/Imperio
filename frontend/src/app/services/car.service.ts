import { Injectable, OnInit } from '@angular/core';
import { Car } from '../models/Car';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService  implements OnInit{
  cars:Car[]=[]
  baseUrl:string='http://localhost:8080/api/cars'

  constructor(private http: HttpClient) { }

  public getCars(page:number=0,size:number=8,callback=(data:any)=>{}){
   
    if(this.cars.length>page*size){
      let result= this.cars.slice(page*size,page*size+size)
    
      
      callback({items:result,totalItems:this.cars.length})
    }else{
       this.fetchCars(page,size,callback)

    }

  }
  
  private fetchCars(page:number,size:number,callback=(data:any)=>{}){

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    
       this.http.get<any>(`${this.baseUrl}/all`, { params }).subscribe({
        next:(data)=>{
          let returedData = JSON.parse(JSON.stringify(data))
          this.cars.push(...returedData.items)
          callback(returedData)

        },
        error:(error)=>{
          alert('Error while trying to get cars '+error)

        }

       })

  }
  ngOnInit(): void {
    this.fetchCars(0,8)
   
  }
}
