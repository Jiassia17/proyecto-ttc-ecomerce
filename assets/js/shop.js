/*  [ Filter / Search product ]*/
document.addEventListener("DOMContentLoaded", function () {
  fetchData(); //cargar
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    paintNumProd();
  }
});

/* Funciones para pintar cart de compras*/
const cards = document.getElementById("cards");
const items = document.getElementById("items");
const templateCard = document.getElementById("template-cards").content;
const templateSize = document.getElementById("size").content;
const templateFooter = document.getElementById("template-footer").content;
const templateCart = document.getElementById("template-cart").content;
//const btnAll = document.querySelector("all");
//const btnWomen = document.querySelector(".women");
//const btnMen = document.querySelector(".men");
//const btnTshirts = document.querySelector(".tshirts");
//const btnJeans = document.querySelector(".jeans");
//const btnShoes = document.querySelector(".shoes");
//const btnMisc = document.querySelector(".misc");
const fragment = document.createDocumentFragment();

let cart = {};
async function fetchData() {
  try {
    const resp = await fetch(
      "https://raw.githubusercontent.com/Jiassia17/proyecto-ttc-ecomerce/refs/heads/main/bd_json/productos.json"
    );
    const data = await resp.json();
    paintCards(data); /* Llamar a la función */
  } catch (error) {
    console.log(error);
  }
}

function paintCards(data) {
  //console.log(data);
  data.forEach((producto) => {
    templateCard.querySelector("h6").textContent = producto.nombre;
    templateCard.querySelector("#precio").textContent = producto.precio;
    templateCard.querySelector("img").setAttribute("src", producto.imagen);
    templateCard.querySelector(".btn-buy").dataset.id = producto.id;
    templateCard
      .querySelector(".size")
      .appendChild(crearItems(producto.tallas));
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
    templateCard
      .querySelector(".size")
      .removeChild(templateCard.querySelector(".items"));
  });
  cards.appendChild(fragment);
}

function crearItems(arr) {
  const item = document.createElement("div");
  item.classList.add("items");
  arr.forEach((elem) => {
    const span = document.createElement("span");
    span.textContent = elem;
    item.appendChild(span);
  });
  return item;
}

function addCart(e) {
  //console.log(e.target);
  if (e.target.classList.contains("btn-buy")) {
    setCart(e.target.parentElement);
  }
  e.stopPropagation();
  e.preventDefault();
  paintNumProd();
}
function setCart(objeto) {
  //console.log(objeto);
  const producto = {
    id: objeto.querySelector(".btn-buy").dataset.id,
    nombre: objeto.querySelector("h6").textContent,
    precio: objeto.querySelector("#precio").textContent,
    /* imagen: objeto.querySelector(img), */
    cantidad: 1,
  };
  if (cart.hasOwnProperty(producto.id)) {
    producto.cantidad = cart[producto.id].cantidad + 1;
    console.log(producto.cantidad);
  }
  cart[producto.id] = { ...producto };
  //console.log(producto);
  //paintCart();
  localStorage.setItem("cart", JSON.stringify(cart));
}

cards.addEventListener("click", (e) => {
  addCart(e);
});

items.addEventListener("click", (e) => {
  btnAccion(e);
});
