import { Component } from '@angular/core';
import { ApiCovidService } from '../../Servicios/api-covid.service';

@Component({
  selector: 'app-infogeneral',
  templateUrl: './infogeneral.component.html',
  styleUrls: ['./infogeneral.component.css']
})
export class InfogeneralComponent {
  titulo = 'Información general';
  MuertosTotales!: number;
  CasosTotales!: number;
  NuevosCasos!: number;

  constructor(private ApiCovidService: ApiCovidService ) {
    this.ApiCovidService.obtenerDatos().subscribe((data: any) => {
      this.MuertosTotales = data.Global.TotalDeaths;
      this.CasosTotales = data.Global.TotalConfirmed;
      this.NuevosCasos = data.Global.NewConfirmed;
      console.log(this.MuertosTotales);
      console.log(this.CasosTotales);
      console.log(this.NuevosCasos);
    });
  }
}
