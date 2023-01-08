import { Component } from '@angular/core';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';


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
  selectChangeHandler (event: any) {
    this.pais = event.target.value;
    this.consultaEnfermos();
    this.consultaBandera();
  }
  consultaEnfermos() {
    fetch('https://api.covid19api.com/summary')
    .then(response => response.json())
    .then(data => {
      var paises = data.Countries;
      for (var i = 0; i < paises.length; i++) {
        if ( paises[i].Country == this.pais) {
          this.confsec = paises[i].TotalConfirmed;
          this.muertosec = paises[i].TotalDeaths;
          this.nuevoconf = paises[i].NewConfirmed;
        }
      }
    })
    .catch(error => console.log(error));
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
  <h2>Confirmados Nuevos: `+ this.confsec +`</h2>`;
  if(document.getElementById("show") != null) {
    document.getElementById("show")?.appendChild(contenido);
    document.getElementById("show")?.appendChild(img);
  }
  }
  constructor() {
    fetch('https://api.covid19api.com/summary')
  .then(response => response.json())
  .then(data => {
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
  })

  .catch(error => console.log(error));
  var select = document.getElementById("menu");
  select?.addEventListener("change", function() {

  })
}
}

