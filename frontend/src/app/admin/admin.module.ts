import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './components/subcomponents/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CarsPageComponent } from './components/cars-page/cars-page.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EditCarComponent } from './components/edit-car/edit-car.component';


@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    CarsPageComponent,
    AddCarComponent,
    EditCarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterOutlet,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }
