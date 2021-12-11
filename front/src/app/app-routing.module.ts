import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'aerolinea',
    loadChildren: () => import('./aerolinea/aerolinea.module').then(m => m.AerolineaModule),
  },
  {
    path: '**',
    redirectTo: 'aerolinea'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
