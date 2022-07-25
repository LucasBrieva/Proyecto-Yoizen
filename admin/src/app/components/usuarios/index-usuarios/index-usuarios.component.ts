import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

declare var iziToast: any;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-index-usuarios',
  templateUrl: './index-usuarios.component.html',
  styleUrls: ['./index-usuarios.component.css']
})
export class IndexUsuariosComponent implements OnInit {
  public usuarios: Array<any> = [];
  public usuario: any = {};

  public page = 1;
  public pageSize = 10;
  public token: any;
  public load_data = true;
  public has_data = true;
  public filtro: any = {
    id: "",
    nombre: "",
    rol: "",
  };
  constructor(
    private _adminService: AdminService
  ) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this.metFiltro();
  }
  filtrar() {
    this.metFiltro();
  }
  limpiarFiltro() {
    this.filtro.id = '';
    this.filtro.nombre = '';
    this.filtro.rol = '';
    this.metFiltro();
  }
  metFiltro() {
    this.load_data = true;
    this._adminService.getListUser().subscribe(
      res => {
        this.usuarios = res.clients;
        debugger;
        if(this.filtro.rol != ""){
          if (this.filtro.id != "" || this.filtro.nombre != "") {
            this.usuarios = this.usuarios.filter(x => x.name.toUpperCase().includes(this.filtro.nombre.toUpperCase()) && x.id.includes(this.filtro.id) && x.role == this.filtro.rol);
          }
        }else{
          this.usuarios = this.usuarios.filter(x => x.name.toUpperCase().includes(this.filtro.nombre.toUpperCase()) && x.id.includes(this.filtro.id));

        }


        this.has_data = this.usuarios.length > 0;
        this.load_data = false;
      },
      err => {
        console.log(err);
      }
    )
  }
}
