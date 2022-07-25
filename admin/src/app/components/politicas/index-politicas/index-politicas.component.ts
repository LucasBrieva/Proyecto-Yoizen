import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

declare var iziToast: any;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-index-politicas',
  templateUrl: './index-politicas.component.html',
  styleUrls: ['./index-politicas.component.css']
})
export class IndexPoliticasComponent implements OnInit {
  public politicas: Array<any> = [];
  public usuarios: Array<any> = [];
  public politica: any = {};

  public page = 1;
  public pageSize = 10;
  public token: any;
  public load_data = true;
  public has_data = true;
  public filtro: any;
  keyword = 'name';

  constructor(
    private _adminService: AdminService
  ) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this._adminService.getListUser().subscribe(
      res => {
        this.usuarios = res.clients;
        this.metFiltro();
      },
      err => {
        console.log(err);
      }
    )
  }
  filtrar() {
    this.metFiltro();
  }
  limpiarFiltro() {
    this.filtro = undefined;
    this.metFiltro();
  }
  metFiltro() {
    this.load_data = true;
    this._adminService.getListPolicies().subscribe(
      res => {
        this.politicas = res.policies;
        if (this.filtro != undefined) {
          this.politicas = this.politicas.filter(x => x.clientId == this.filtro.id);
        }
        this.politicas.forEach(element => {
          let usuario = this.usuarios.find(function (o: any) { return o.id == element.clientId });
          if (usuario != undefined) {
            element.userName = usuario.name;
          }
        });

        this.has_data = this.politicas.length > 0;
        this.load_data = false;
      },
      err => {
        console.log(err);
      }
    )
  }


}
