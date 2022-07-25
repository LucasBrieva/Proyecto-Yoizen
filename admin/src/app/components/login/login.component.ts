import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { JwtHelperService } from "@auth0/angular-jwt";

declare var jquery: any;
declare var $: any;
declare var iziToast: any;
declare var jwt: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {};
  public usuario: any = {};
  public token: any = '';

  constructor(
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['/login']);
    }
    else {

    }
  }

  login(loginForm: any) {
    if (loginForm.valid) {
      let data = {
        email: this.user.email,
        password: this.user.password,
      }
      this._adminService.getListUser().subscribe(
        res => {
          let user = res.clients.find(function (o: any) { return o.email == data.email && o.password == data.password });
          if (user == undefined) {
            iziToast.show({
              title: 'ERROR',
              titleColor: '#F4EDED',
              backgroundColor: '#F54646',
              class: 'text-danger',
              position: 'topRight',
              message: 'Los datos del formulario no son válidos',
              messageColor: '#F4EDED'
            })
          } else {
            this._adminService.generate_token(user).subscribe(
              response => {
                iziToast.show({
                  title: 'BIENVENIDO',
                  titleColor: '#FFF',
                  backgroundColor: '#83DF4E',
                  class: 'text-danger',
                  position: 'topRight',
                  message: 'Hola ' + response.data.name.toUpperCase() + ', bienvenido/a',
                  messageColor: '#FFF'
                })
                this.usuario = response.data;
                localStorage.setItem('token', response.token);
                localStorage.setItem('_id', response.data.id)
                setTimeout(() => {
                  this._router.navigate(['/']);
                }, 2000);
              },
              error => {
                console.log(error);
              }
            )
          }
        }
      )
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#F4EDED',
        backgroundColor: '#F54646',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son válidos',
        messageColor: '#F4EDED'
      })
    }
  }
}
