import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CarsPageComponent } from './components/cars-page/cars-page.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';
import { adminGuardGuard } from '../guards/admin-guard.guard';

const routes: Routes = [
  {
    path:'admin',component:AdminComponent,
    canActivate: [adminGuardGuard],
    children:[
      {
        path:'',component:CarsPageComponent,
      },
      {
        path:'new-car',component:AddCarComponent
      },
      {
        path:'edit-car/:id',component:EditCarComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
