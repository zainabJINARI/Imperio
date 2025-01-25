import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CarsPageComponent } from './components/cars-page/cars-page.component';
import { AddCarComponent } from './components/add-car/add-car.component';

const routes: Routes = [
  {
    path:'admin',component:AdminComponent,
    children:[
      {
        path:'',component:CarsPageComponent,
      },
      {
        path:'new-car',component:AddCarComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
