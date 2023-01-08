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
  Top1!: string;
  Top2!: string;
  Top3!: string;
  Top1Casos!: number;
  Top2Casos!: number;
  Top3Casos!: number;

  //Add a map called paisesCovidosos
  paisesCovidosos: Map<string, number> = new Map();

  constructor(private ApiCovidService: ApiCovidService ) {
    this.ApiCovidService.obtenerDatos().subscribe((data: any) => {
      this.MuertosTotales = data.Global.TotalDeaths;
      this.CasosTotales = data.Global.TotalConfirmed;
      this.NuevosCasos = data.Global.NewConfirmed;
      var paises = data.Countries;
      paises.forEach((element: { Country: string; TotalConfirmed: number; }) => {
        this.paisesCovidosos.set(element.Country, element.TotalConfirmed);
      });
      this.llenarDatos();
      var paisesCovidososOrdenados = new Map([...this.paisesCovidosos.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3));
      this.Top1 = Array.from(paisesCovidososOrdenados.keys())[0];
      this.Top2 = Array.from(paisesCovidososOrdenados.keys())[1];
      this.Top3 = Array.from(paisesCovidososOrdenados.keys())[2];
      this.Top1Casos = Array.from(paisesCovidososOrdenados.values())[0];
      this.Top2Casos = Array.from(paisesCovidososOrdenados.values())[1];
      this.Top3Casos = Array.from(paisesCovidososOrdenados.values())[2];
      var contenido2 = document.createElement("div");
      contenido2.innerHTML = `
      <style type="text/css">
      .tg  {border-collapse:collapse;border-spacing:0;}
      .tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
        overflow:hidden;padding:10px 5px;word-break:normal;}
      .tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
        font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
      .tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
      </style>
      <table class="tg">
      <thead>
        <tr>
          <th class="tg-0pky">Paises</th>
          <th class="tg-0pky">Casos Reportados<br>al día de hoy</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="tg-0pky">`+ this.Top1 +`</td>
          <td class="tg-0pky">` + this.Top1Casos + `</td>
        </tr>
        <tr>
          <td class="tg-0pky"><span style="font-weight:400;font-style:normal">`+ this.Top2 + `</span></td>
          <td class="tg-0pky"><span style="font-weight:400;font-style:normal">` + this.Top2Casos + `</span></td>
        </tr>
        <tr>
          <td class="tg-0pky"><span style="font-weight:400;font-style:normal">` + this.Top3 + `</span></td>
          <td class="tg-0pky">` + this.Top3Casos + `</td>
        </tr>
      </tbody>
      </table>`;
      document.getElementById("show")?.appendChild(contenido2);

    });
  }
  llenarDatos() {
    var contenido = document.createElement("div");
    contenido.innerHTML = `<h2>Muertos Totales: `+ this.MuertosTotales + `</h2>
    <h2>Casos Totales: `+ this.CasosTotales +`</h2>
    <h2>Nuevos Casos: `+ this.NuevosCasos +`</h2>`;
      document.getElementById("show")?.appendChild(contenido);


  }
}
