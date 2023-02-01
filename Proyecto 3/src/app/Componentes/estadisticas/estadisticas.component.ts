import { Component } from '@angular/core';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { ApiCovidService } from '../../Servicios/api-covid.service';


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {
  pais: string = '';
  paises: string[] = [];
  confsec!: number;
  muertosec!: number;
  nuevoconf!: number;
  muestra: string = `<div class="show">
  <h1>`+ this.pais + `</h1>
  <h2>Muertos: `+ this.muertosec +`</h2>
  <h2>Confirmados Nuevos: `+ this.confsec +`</h2>
  </div>`;
  MuertosTotales!: number;
  CasosTotales!: number;

  selectChangeHandler (event: any) {
    this.pais = event.target.value;
    this.consultaEnfermos();
    this.consultaBandera();
  }

  consultaEnfermos() {
    this.ApiCovidService.obtenerDatos().subscribe((data: any) => {
      var paises = data.Countries;
      for (var i = 0; i < paises.length; i++) {
        if ( paises[i].Country == this.pais) {
          this.confsec = paises[i].TotalConfirmed;
          this.muertosec = paises[i].TotalDeaths;
          this.nuevoconf = paises[i].NewConfirmed;
        }
      }
    });
  }
  consultaBandera() {
    if(document.getElementById("show") != null) {
      if(document.getElementById("show")?.hasChildNodes()) {
        document.getElementById("show")?.removeChild(document.getElementById("show")?.firstChild!);
        document.getElementById("show")?.removeChild(document.getElementById("show")?.firstChild!);
      }
    }
  const url = 'https://countryflagsapi.com/png/' + this.pais;
  const img = document.createElement('img');
  img.crossOrigin = 'anonymous';
  img.src = url;
  img.id = "bandera";
  var contenido = document.createElement("div");
  contenido.innerHTML = `<h1>`+ this.pais + `</h1>
  <h2>Muertos: `+ this.muertosec +`</h2>
  <h2>Casos Confirmados Totales: `+ this.confsec +`</h2>`;
  if(document.getElementById("show") != null) {
    document.getElementById("show")?.appendChild(contenido);
    document.getElementById("show")?.appendChild(img);
  }
  }
  constructor(private ApiCovidService: ApiCovidService) {
    this.ApiCovidService.obtenerDatos().subscribe((data: any) => {
      var paises = data.Countries;
      for (var i = 0; i < paises.length; i++) {
        this.paises.push(paises[i].Country);
        if ( paises[i].Country == "Ecuador") {
          this.confsec = paises[i].TotalConfirmed;
          this.muertosec = paises[i].TotalDeaths;
          this.nuevoconf = paises[i].NewConfirmed;
        }
      }
      var select = document.getElementById("menu");
    for (var i = 0; i < this.paises.length; i++) {
      var option = document.createElement("option");
      option.text = this.paises[i];
      select?.appendChild(option);
    }
    });
  }
}

