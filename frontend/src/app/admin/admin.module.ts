import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './components/subcomponents/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CarsPageComponent } from './components/cars-page/cars-page.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    CarsPageComponent,
    AddCarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterOutlet,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
