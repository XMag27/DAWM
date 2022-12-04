var ecuador
var muertosec
var recuperadosec
var confsec
var nuevoconf;

onload = async () => {
fetch('https://api.covid19api.com/summary', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var select = document.getElementById("menu");
        var paises = data.Countries;
        paises.forEach(element => {
            var option = document.createElement("option");
            option.text = element.Country;
            select.add(option);
            if (element.Country == "Ecuador") {
                ecuador = element;
                confsec = ecuador.TotalConfirmed;
                muertosec = ecuador.TotalDeaths;    
                nuevoconf = ecuador.NewConfirmed;
            }
        });

    
})
    .catch(error => console.log(error));
}

fetch('https://api.covid19api.com/summary', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        
        var paisesCovidosos = new Map();
        document.getElementById("menu").addEventListener("change", function () {
            document.getElementById("tabla").innerHTML = `<thead>
            <tr>
              <th>País</th>
              <th>Casos</th>
              <th>Muertes</th>
            </tr>
            </thead>
            <tbody id="tabele"> </tbody>`;
            document.getElementById("titulo").innerHTML = "";
            document.getElementById("grafico1").innerHTML = "";
            document.getElementById("grafico2").innerHTML = "";
            var pais = document.getElementById("menu").value;
            var global = data.Global;
            var totalcovid = global.TotalConfirmed;
            var paises = data.Countries;
            paises.forEach(element => {
                
                if (element.Country == pais) {
                    var muertos = element.TotalDeaths;
                    var total = element.TotalConfirmed;
                    var recuperados = total - muertos;
                    document.getElementById("titulo").innerHTML += " Casos de SARS-CoV-2 en el país "  + pais;
                    document.getElementById("grafico1").innerHTML += `
                    <tbody>
                        <tr>
                            <td style="--size: calc( ${element.TotalDeaths} / ${element.TotalConfirmed} )"> <span class="data">Muertos: ${muertos}</span> </td>
                        </tr>
                        <tr>
                            <td style="--size: calc( (${element.TotalConfirmed}-${element.TotalDeaths}) / ${element.TotalConfirmed} )"><span class="data">Recuperados: ${recuperados}</span> </td>
                        </tr>
                    </tbody>
                    `;
                }
                
            });
            paises.forEach(element => {
                paisesCovidosos.set(element.Country, element.TotalConfirmed);
                document.getElementById("tabla").innerHTML += `
                <tr>
                    <td>${element.Country}</td>
                    <td>${element.TotalConfirmed}</td>
                    <td>${element.TotalDeaths}</td>
                </tr>
                `;
            });
            var texto = "";
            var paisesCovidososOrdenados = new Map([...paisesCovidosos.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10));
            var mayor = Math.max(...paisesCovidososOrdenados.values());
            paisesCovidososOrdenados.forEach((value, key) => {
                texto += `
                <tr>
                <td style="--size: calc( ${value} / ${mayor} )"> <span class="data">${key}</span> </td>
                </tr>`
                
            });
            
    
            document.getElementById("grafico2").innerHTML += `
                    <tbody>
                        ${texto} 
                    </tbody>
                    `;
        })
        
    })
    .catch(error => console.log(error));

    document.getElementById("ec").addEventListener("click", function () {
        alert("Ecuador tiene: " + confsec + " casos confirmados y " + muertosec + " muertos" + " y " + nuevoconf + " nuevos casos confirmados");
    });