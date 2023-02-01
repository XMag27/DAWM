
let map = new Map();
async function getCustomers() {
    fetch('http://localhost:3000/customers')
        .then(response => response.json())
        .then(data => {
            let select = document.getElementById('compradores');
            data.forEach(customer => {
                let option = document.createElement('option');
                option.value = customer.customerNumber;
                option.innerHTML = customer.customerName;
                select.appendChild(option);
                map.set(customer.customerName, customer.customerNumber);
            }
            );
        }
        );
}
function getShipped() {
    document.getElementById('tabla').innerHTML = `<thead>
    <tr>
      <th scope="col">Nombre del Producto</th>
      <th scope="col">Vendedor</th>
      <th scope="col">Fecha de envio</th>
    </tr>
  </thead>`;
    document.getElementById('tabla2').innerHTML = `<thead>
    <tr>
      <th scope="col">Nombre del Producto</th>
      <th scope="col">Vendedor</th>
      <th scope="col">Estado del pedido</th>
    </tr>
  </thead>`;
    let select = document.getElementById('compradores');
    let customerName = select.options[select.selectedIndex].text;
    let customerNumber = map.get(customerName);
    console.log(customerNumber);
    fetch('https://apinosql-default-rtdb.firebaseio.com/collection.json?orderBy=%22status%22&equalTo=%22Shipped%22')
        .then(response => response.json())
        .then(data => {
            let contador = 0;
            for (let key in data) {
                if (data[key].customerNumber == customerNumber) {
                    let table = document.getElementById('tabla');
                    let row = table.insertRow();
                    let cell1 = row.insertCell();
                    let cell2 = row.insertCell();
                    let cell3 = row.insertCell();
                    cell1.innerHTML = data[key].productName;
                    cell2.innerHTML = data[key].productVendor;
                    cell3.innerHTML = data[key].shippedDate;
                    contador++;
                }
            }
            alert('El cliente ' + customerName + ' ha recibido ' + contador + ' productos');
        }
        );
    fetch('https://apinosql-default-rtdb.firebaseio.com/collection.json')
        .then(response => response.json())
        .then(data => {
            let contador = 0;
            for (let key in data) {
                if (data[key].customerNumber == customerNumber) {
                    let table = document.getElementById('tabla2');
                    let row = table.insertRow();
                    let cell1 = row.insertCell();
                    let cell2 = row.insertCell();
                    let cell3 = row.insertCell();
                    cell1.innerHTML = data[key].productName;
                    cell2.innerHTML = data[key].productVendor;
                    cell3.innerHTML = data[key].status;
                    contador++;
                }
            }
        }
        );
}


document.getElementById('compradores').addEventListener('change', getShipped);



window.addEventListener('load', () => {
    getCustomers();
});