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
