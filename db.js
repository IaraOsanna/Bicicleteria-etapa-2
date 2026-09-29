import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getDatabase, set, ref, onValue } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyAwUMIMqBy0auX5PvTWhPjvTJBhFZ7E0WQ",
    authDomain: "bicicleteria-b2ae3.firebaseapp.com",
    databaseURL: "https://bicicleteria-b2ae3-default-rtdb.firebaseio.com",
    projectId: "bicicleteria-b2ae3",
    storageBucket: "bicicleteria-b2ae3.firebasestorage.app",
    messagingSenderId: "759510024682",
    appId: "1:759510024682:web:7c1bb3a06dccb9c982f293",
   
  };
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);


  let inputmarca = document.querySelector("#marca")
  let inputID = document.querySelector("#id")
  let inputstock = document.querySelector("#stock")
  let inputcolor = document.querySelector("#color")
  let inputtipo = document.querySelector("#tipo")
  let botonGuardar = document.querySelector("#btn")
  botonGuardar.onclick = function() {
    let marca = inputmarca.value;
    let id = inputID.value;
    let stock = inputstock.value;
    let color = inputcolor.value;
    let tipo = inputtipo.value;

    set(ref(db, "Bicicleteria/" + id), {
        marca: marca,
        id: id,
        stock: stock,
        color: color,
        tipo: tipo
    })
    }
    .then(function() {
        alert("Bicicleta guardada");
        })
        .catch(function(error) {
            alert("Error al guardar la bicicleta: " + error);
            });
    let referencia = ref(db, "Bicicleteria");

onValue(referencia, function(datos) {

    let registros = datos.val();

    let tabla = document.querySelector("#tablaBicicletas");

    tabla.innerHTML = "";

    if (registros != null) {

        Object.values(registros).forEach(function(bicicleta) {

            let fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${bicicleta.id}</td>
                <td>${bicicleta.marca}</td>
                <td>${bicicleta.stock}</td>
                <td>${bicicleta.color}</td>
                <td>${bicicleta.tipo}</td>
            `;

            tabla.appendChild(fila);
        });
    }
});
