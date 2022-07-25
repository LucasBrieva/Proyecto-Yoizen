import { Routes, RouterModule } from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";

import { AdminGuard } from "./guards/admin.guard"
import { IndexUsuariosComponent } from "./components/usuarios/index-usuarios/index-usuarios.component";
import { IndexPoliticasComponent } from "./components/politicas/index-politicas/index-politicas.component";
import { RestrictedGuard } from "./guards/restricted.guard";


const appRoute : Routes =[
    {path: '', redirectTo: 'inicio', pathMatch:'full'},

    {path: 'inicio', component: InicioComponent, canActivate: [AdminGuard]},

    {path: 'panel', children:[
      {path:'usuarios', component:IndexUsuariosComponent, canActivate:[AdminGuard]},
      {path:'politicas', component:IndexPoliticasComponent, canActivate:[RestrictedGuard]},

    ]},

    {path:'login', component: LoginComponent}
]

export const appRoutingProviders : any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
