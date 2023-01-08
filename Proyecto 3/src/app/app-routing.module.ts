import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsejosComponent } from './Componentes/consejos/consejos.component';
import { EstadisticasComponent } from './Componentes/estadisticas/estadisticas.component';
import { InfogeneralComponent } from './Componentes/infogeneral/infogeneral.component';
import { MainComponent } from './Componentes/main/main.component';


const routes: Routes = [
  { path: 'consejos', component: ConsejosComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: 'infogeneral', component: InfogeneralComponent },
  { path: 'main', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
