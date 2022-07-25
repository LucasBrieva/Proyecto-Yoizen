import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AdminService } from 'src/app/services/admin.service';
import { JwtHelperService } from "@auth0/angular-jwt";

declare var iziToast: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public token: any = '';
  public rol: any = false;
  constructor(
    private _router: Router,
    private _adminService : AdminService
  ) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    if(this._adminService.isAuthenticated(['admin'])){
      this.rol = true;
    }
  }

  cerrarSesion(): void {
    localStorage.clear();
    iziToast.show({
      title: 'SESIÓN CERRADA',
      titleColor: '#FFF',
      backgroundColor: '#83DF4E',
      class: 'text-danger',
      position: 'topRight',
      message: 'Gracias por probar esta mini app, que tenga buen día.',
      messageColor: '#FFF'
    })
    setTimeout(() => {
      this._router.navigate(["/login"]);
    }, 2000);
  }
}
