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

  public getCars(page:number=0,size:number=8,available:any=null,callback=(data:any)=>{}){
   
    if(this.cars.length>page*size){
      let totalRes;
      if(available !=null){
        console.log('am in available is not  null ')
        let boolValue: boolean = Boolean(available);

        totalRes = this.cars.filter(c=>c.available == boolValue)

      }else{

        totalRes=this.cars
      }

      let result= totalRes.slice(page*size,page*size+size)

      
    
      
      callback({items:result,totalItems:totalRes.length})
    }else{
       this.fetchCars(page,size,available,callback)

    }

  }
  
  private fetchCars(page:number,size:number,available:any=null,callback=(data:any)=>{}){


 
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())

      if(available !=null){
        let boolValue: boolean = Boolean(available);
        
        params= new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
        .set('available',`${boolValue}`);

      }

    
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


  public getCarById(id:number){
    return this.cars.find(c=>c.id==id)
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
          carObject.available=true
          this.cars.push(carObject);

          callback(id)

        },
        error:()=>{
          alert('Erro while trying to create car ')
        }
      })

     

    
    
  }
  public editCar(id:number,carData :FormData,callback=(arg:any)=>{}){
    let headersData= this.getAuthHeaders()

    if(!headersData){
      return 

    }


    this.http.put<Car>(`${this.baseUrl}/${id}`,carData,{headers:headersData}).subscribe({
      next:(updatedCar)=>{
        console.log(carData)
       
       
       
        this.cars= this.cars.map((c)=>{
          // if the returned updated car doesn't hold a value in the picture then the picture didn't change
          if(!updatedCar.picture){
            updatedCar.picture= c.picture
          }
          return c.id==updatedCar.id ?  updatedCar : c

        })

        callback(updatedCar)

      },
      error:()=>{
        alert('Erro while trying to update car ')
      }
    })
  } 
  
  
  
  ngOnInit(): void {
    this.fetchCars(0,8)
   
  }
}
