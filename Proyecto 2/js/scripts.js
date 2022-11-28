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
            document.getElementById("grafico1").innerHTML = "";
            document.getElementById("grafico2").innerHTML = "";
            var pais = document.getElementById("menu").value;
            var global = data.Global;
            var totalcovid = global.TotalConfirmed;
            var paises = data.Countries;
            paises.forEach(element => {
                if (element.Country == pais) {
                    console.log(element);
                    var muertos = element.TotalDeaths;
                    var total = element.TotalConfirmed;
                    var recuperados = total - muertos;
                    document.getElementById("titulo").innerHTML += " " + pais;
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