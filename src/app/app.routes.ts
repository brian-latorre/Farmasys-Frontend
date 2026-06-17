import { Routes } from '@angular/router';
import { GestionarProductoComponent } from './components/gestionar-producto/gestionar-producto';
export const routes: Routes = [
  { path: 'productos', component: GestionarProductoComponent },
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
];
