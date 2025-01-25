import { Injectable, OnInit } from '@angular/core';
import { Car } from '../models/Car';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarService  implements OnInit{
  cars:Car[]=[]
  baseUrl:string='http://localhost:8080/api/cars'

  constructor(private http: HttpClient,private auth:AuthService,private router:Router) { }

   private getAuthHeaders() {
    const token = this.auth.getToken();

   
    console.log(token)
    if(token){
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });


    }else{
      alert('The  session is expired you should relog in')
      localStorage.clear()
      this.router.navigateByUrl('/login')
      
    }
    return 
     
   
  }

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
  public deleteCar(id:number,callback=()=>{}){
    // get the token and check if it's still valid or it's expired
    let headersData= this.getAuthHeaders()

    if(!headersData){
      return 

    }

    this.http.delete<void>(`${this.baseUrl}/${id}`, { headers:  headersData}).subscribe({
      next:()=>{
        this.cars = this.cars.filter(c=>c.id!=id)
        callback()

      },
      error:()=>{
        alert('error while trying to delete car')
      }
    })
    
  }

  public addCar(carData :FormData,callback=(arg:any)=>{}){

    let headersData= this.getAuthHeaders()

    if(!headersData){
      return 

    }
   
      this.http.post<number>(this.baseUrl,carData,{headers:headersData}).subscribe({
        next:(id)=>{
          let carObject: any ={} ;
         
          carData.forEach((value, key) => {
            carObject[key] = value;
          });
          carObject.id = id;
          this.cars.push(carObject);

          callback(id)

        },
        error:()=>{
          alert('Erro while trying to create car ')
        }
      })

    
    
  }
  ngOnInit(): void {
    this.fetchCars(0,8)
   
  }
}
