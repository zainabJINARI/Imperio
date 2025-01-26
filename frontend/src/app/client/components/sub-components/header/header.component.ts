import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isAuthenticated:boolean=false

  constructor(
    private auth:AuthService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.isAuthenticated =this.auth.getToken() ? true : false
  }

  onLogout() {
    this.auth.logout(()=>{

      this.router.navigateByUrl('/login')
    })
    }

}
