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
const paginationContainer = document.getElementById("pagination");
const rowsPerPage = 6;
let currentPage = 1;
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
      "./bd_json/productos.json"
  /*     "https://raw.githubusercontent.com/Jiassia17/proyecto-ttc-ecomerce/refs/heads/main/bd_json/productos.json" */
    );
    const data = await resp.json();
    //console.log(data);
    paintCards(data, cards, rowsPerPage, currentPage); /* Llamar a la función */
    setupPagination(data, paginationContainer, rowsPerPage);
  } catch (error) {
    console.log(error);
  }
}

function paintCards(data, wrapper, rowsPerPage, page) {
  //console.log(data);
  wrapper.innerHTML = "";
  page--;

  let start = rowsPerPage * page;
  let end = start + rowsPerPage;
  let paginatedItems = data.slice(start, end);
  //console.log(paginatedItems);
  for (let i = 0; i < paginatedItems.length; i++) {
    let item = paginatedItems[i];
    templateCard.querySelector("h6").textContent = item.nombre;
    templateCard.querySelector("#precio").textContent = item.precio;
    templateCard.querySelector("img").setAttribute("src", item.imagen);
    templateCard.querySelector(".btn-buy").dataset.id = item.id;
    templateCard.querySelector(".size").appendChild(crearItems(item.tallas));
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
    templateCard
      .querySelector(".size")
      .removeChild(templateCard.querySelector(".items"));
  }
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
    setCart(e.target.parentElement.parentElement);
  }
  e.stopPropagation();
  e.preventDefault();
  paintNumProd();
}
function setCart(objeto) {
  console.log(objeto);
  const producto = {
    id: objeto.querySelector(".btn-buy").dataset.id,
    nombre: objeto.querySelector("h6").textContent,
    precio: objeto.querySelector("#precio").textContent,
    imagen: objeto.querySelector("img").getAttribute("src"),
    cantidad: 1,
  };
  if (cart.hasOwnProperty(producto.id)) {
    producto.cantidad = cart[producto.id].cantidad + 1;
    //console.log(producto.cantidad);
  }
  cart[producto.id] = { ...producto };
  console.log(producto);
  //paintCart();
  localStorage.setItem("cart", JSON.stringify(cart));
}

cards.addEventListener("click", (e) => {
  addCart(e);
});

items.addEventListener("click", (e) => {
  btnAccion(e);
});

/* Paginación */
function setupPagination(items, wrapper, rowsPerPage) {
  wrapper.innerHTML = "";

  let pageCount = Math.ceil(items.length / rowsPerPage);
  for (let i = 1; i < pageCount + 1; i++) {
    let btn = paginationButton(i, items);
    wrapper.appendChild(btn);
  }
}

function paginationButton(page, items) {
  let button = document.createElement("button");
  button.classList.add("btn", "btn-outline-dark");
  button.innerText = page;

  if (currentPage == page) button.classList.add("active");

  button.addEventListener("click", function () {
    //console.log("Hiciste click en el botón de la página", page);
    currentPage = page;
    
    paintCards(items, cards, rowsPerPage, currentPage);
    let currentBtn = document.querySelector(".pagination button.active");
    currentBtn.classList.remove("active");
    button.classList.add("active");
  });

  return button;
}
