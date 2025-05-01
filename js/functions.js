
const idiomas = {
  es: {
    mensaje: "Idioma actual: Español",
    codigoBarras: "Codigo de barras",
    fechaOptions: {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    },
    locale: 'es-ES',
    noEncontrado: "El producto no se encuentra",
    producto: "Producto",
    precio: "Precio"
  },
  en: {
    mensaje: "Current language: English",
    codigoBarras: "Barcode",
    fechaOptions: {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    },
    locale: 'en-US',
    noEncontrado: "Product not found",
    producto: "Product",
    precio: "Price"
  }
};

const productos = [
  ["1", "Palomitas", "$ 23.00", "palomitas.jpg"],
  ["2", "Refresco", "$ 18.00", "refresco.jpeg"],
  ["3", "Nachos", "$ 35.00", "nachos.jpeg"],
  ["4", "Hot Dog", "$ 30.00", "hotdog.jpg"],
  ["5", "Pizza", "$ 50.00", "pizza.jpg"],
  ["6", "Helado", "$ 25.00", "helado.jpg"],
  ["7", "Chocolate", "$ 20.00", "chocolate.jpeg"],
  ["8", "Galletas", "$ 15.00", "galletas.jpeg"],
  ["9", "Papas Fritas", "$ 28.00", "papasfritas.jpeg"],
  ["10", "Dulces", "$ 10.00", "dulces.jpeg"],
  ["11", "Agua", "$ 12.00", "agua.jpeg"],
  ["12", "Café", "$ 22.00", "cafe.jpeg"],
  ["13", "Té Helado", "$ 20.00", "te.png"],
  ["14", "Brownie", "$ 26.00", "brownie.jpeg"],
  ["15", "Panini", "$ 40.00", "panini.jpeg"],
  ["16", "Ensalada", "$ 32.00", "ensalada.jpeg"],
  ["17", "Smoothie", "$ 27.00", "smoothie.jpeg"],
  ["18", "Yogur", "$ 18.00", "yogur.jpeg"],
  ["19", "Empanada", "$ 24.00", "empanada.jpeg"],
  ["20", "Sandwich", "$ 38.00", "sandwich.jpeg"]
];

const productos_en = [
  ["1", "Popcorn", "$ 23.00", "palomitas.jpg"],
  ["2", "Soda", "$ 18.00", "refresco.jpeg"],
  ["3", "Nachos", "$ 35.00", "nachos.jpeg"],
  ["4", "Hot Dog", "$ 30.00", "hotdog.jpg"],
  ["5", "Pizza", "$ 50.00", "pizza.jpg"],
  ["6", "Ice Cream", "$ 25.00", "helado.jpg"],
  ["7", "Chocolate", "$ 20.00", "chocolate.jpeg"],
  ["8", "Cookies", "$ 15.00", "galletas.jpeg"],
  ["9", "French Fries", "$ 28.00", "papasfritas.jpeg"],
  ["10", "Candy", "$ 10.00", "dulces.jpeg"],
  ["11", "Water", "$ 12.00", "agua.jpeg"],
  ["12", "Coffee", "$ 22.00", "cafe.jpeg"],
  ["13", "Iced Tea", "$ 20.00", "te.png"],
  ["14", "Brownie", "$ 26.00", "brownie.jpeg"],
  ["15", "Panini", "$ 40.00", "panini.jpeg"],
  ["16", "Salad", "$ 32.00", "ensalada.jpeg"],
  ["17", "Smoothie", "$ 27.00", "smoothie.jpeg"],
  ["18", "Yogurt", "$ 18.00", "yogur.jpeg"],
  ["19", "Empanada", "$ 24.00", "empanada.jpeg"],
  ["20", "Sandwich", "$ 38.00", "sandwich.jpeg"]
];

let idiomaActual = 'es';
let codigo = "";

function cambiarIdioma() {
  const toggle = document.getElementById("toggle");
  idiomaActual = toggle.checked ? 'en' : 'es';

  const langData = idiomas[idiomaActual];
  document.getElementById("mensaje").textContent = langData.mensaje;

  const respuesta = document.getElementById("respuesta");
  if (respuesta.innerHTML.includes(idiomas.es.codigoBarras) || respuesta.innerHTML.includes(idiomas.en.codigoBarras)) {
    respuesta.innerHTML = `
      <img src="./img/barcode.gif" alt="" width="15%" height="15%">
      <br>${langData.codigoBarras}
    `;
  }

  actualizarFechaHora();
}

function actualizarFechaHora() {
  const ahora = new Date();
  const langData = idiomas[idiomaActual];
  const fechaHoraFormateada = ahora.toLocaleDateString(langData.locale, langData.fechaOptions);
  document.getElementById('fecha-hora').textContent = fechaHoraFormateada;
}

function buscar(cod) {
  let encontrado = false;
  const lang = idiomas[idiomaActual];
  const listaProductos = idiomaActual === 'es' ? productos : productos_en;

  for (let i = 0; i < listaProductos.length; i++) {
    if (listaProductos[i][0] === cod) {
      document.getElementById("respuesta").innerHTML = `
        ${lang.producto}: ${listaProductos[i][1]} <br>
        ${lang.precio}: ${listaProductos[i][2]} <br>
        <img src="./img/${listaProductos[i][3]}" width="25%" height="25%" >
      `;
      encontrado = true;
      break;
    }
  }

  if (!encontrado) {
    document.getElementById("respuesta").innerHTML = lang.noEncontrado;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("toggle").addEventListener("change", cambiarIdioma);
  document.getElementById("theme-toggle").addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
  });

  actualizarFechaHora();
  setInterval(actualizarFechaHora, 1000);

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      codigo += event.key;
    } else {
      buscar(codigo);
      codigo = "";
    }
  });
});
