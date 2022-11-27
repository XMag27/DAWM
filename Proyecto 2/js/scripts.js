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
        document.getElementById("menu").addEventListener("change", function () {
            document.getElementById("grafico1").innerHTML = "";
            var pais = document.getElementById("menu").value;
            var paises = data.Countries;
            paises.forEach(element => {
                if (element.Country == pais) {
                    console.log(element);
                    var muertos = element.TotalDeaths;
                    var total = element.TotalConfirmed;
                    var recuperados = total - muertos;
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
        })
        document.getElementById("global").addEventListener("click", function () {
            console.log(data.Global);
            document.getElementById("grafico1").innerHTML = "";
            var muertos = data.Global.TotalDeaths;
            var total = data.Global.TotalConfirmed;
            var recuperados = total - muertos;
            document.getElementById("grafico2").innerHTML += `
                    <tbody>
                        <tr>
                            <td style="--size: calc( ${data.Global.TotalDeaths} / ${data.Global.TotalConfirmed} )"> <span class="data">Muertos: ${muertos}</span> </td>
                        </tr>
                        <tr>
                            <td style="--size: calc( (${data.Global.TotalConfirmed}-${data.Global.TotalDeaths}) / ${data.Global.TotalConfirmed} )"><span class="data">Recuperados: ${recuperados}</span> </td>  
                        </tr>
                    </tbody>
                    `;
        })
    })
    .catch(error => console.log(error));