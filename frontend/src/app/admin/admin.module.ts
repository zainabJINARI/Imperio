import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomePageComponent } from './components/admin-home-page/admin-home-page.component';
import { SidebarComponent } from './components/subcomponents/sidebar/sidebar.component';
import { UpperbarComponent } from './components/subcomponents/upperbar/upperbar.component';
import { RouterOutlet } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CarsPageComponent } from './components/cars-page/cars-page.component';


@NgModule({
  declarations: [
    AdminHomePageComponent,
    AdminComponent,
    SidebarComponent,
    UpperbarComponent,
    CarsPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterOutlet
  ]
})
export class AdminModule { }
