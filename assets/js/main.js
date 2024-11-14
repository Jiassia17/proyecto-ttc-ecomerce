/*==================================================================




/*  [ Filter / Search product ]*/
document.addEventListener("DOMContentLoaded", function () {
  fetchData(); //cargar productos
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'))
    paintCart()
  }

  // Función para mostrar/ocultar el filtro
  document
    .querySelector(".js-show-filter")
    .addEventListener("click", function () {
      this.classList.toggle("show-filter");
      document.querySelector(".panel-filter").classList.toggle("active");

      if (
        document
          .querySelector(".js-show-search")
          .classList.contains("show-search")
      ) {
        document
          .querySelector(".js-show-search")
          .classList.remove("show-search");
        document.querySelector(".panel-search").classList.remove("active");
      }
    });

  // Función para mostrar/ocultar la búsqueda
  document
    .querySelector(".js-show-search")
    .addEventListener("click", function () {
      this.classList.toggle("show-search");
      document.querySelector(".panel-search").classList.toggle("active");

      if (
        document
          .querySelector(".js-show-filter")
          .classList.contains("show-filter")
      ) {
        document
          .querySelector(".js-show-filter")
          .classList.remove("show-filter");
        document.querySelector(".panel-filter").classList.remove("active");
      }
    });

  /* Botones productos */
  document.querySelectorAll(".btn-products").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelectorAll(".btn-products").forEach(function (btn) {
        btn.classList.remove("active");
      });
      this.classList.add("active");
      /*       const productsBtn = data.filter((product) => {
        product.categoria === e.target.categoria;
      });
      paintCards(productsBtn); */
    });
  });
});

/* Funciones para pintar cart de compras*/
const cards = document.getElementById("cards");
const items = document.getElementById("items");
const templateCard = document.getElementById("template-cards").content;
const templateSize = document.getElementById("size").content;
const templateFooter = document.getElementById("template-footer").content;
const templateCart = document.getElementById("template-cart").content;
const fragment = document.createDocumentFragment();
let cart = {};
async function fetchData() {
  try {
    const resp = await fetch("../bd_json/productos.json");
    const data = await resp.json();
    paintCards(data); /* Llamar a la función */
  } catch (error) {
    console.log(error);
  }
};

function paintCards (data) {
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
};

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

function addCart (e) {
  //console.log(e.target);
  if (e.target.classList.contains("btn-buy")) {
    setCart(e.target.parentElement);
  }
  e.preventDefault()
  e.stopPropagation();
};
function setCart (objeto) {
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
  console.log(producto);
  paintCart();
};

cards.addEventListener("click", (e) => {
  addCart(e);
});

items.addEventListener("click", (e) => {
  btnAccion(e);
});
function paintCart () {
  console.log(cart);
  items.innerHTML = "";
  Object.values(cart).forEach((producto) => {
    templateCart.querySelector(".column-1").textContent = producto.id;
    templateCart.querySelector(".column-2").textContent = producto.nombre;
    templateCart.getElementById("precio").textContent = producto.precio;
    templateCart.querySelector(".num-product").textContent = producto.cantidad;
    templateCart.querySelector(".btn-num-product-down").dataset.id = producto.id;
    templateCart.querySelector(".btn-num-product-up").dataset.id = producto.id;
    templateCart.querySelector(".column-5").textContent =
    producto.cantidad * producto.precio;
    const clone = templateCart.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
  paintFooter();
  localStorage.setItem('cart', JSON.stringify(cart))
};

function paintFooter () {
  footer.innerHTML = "";
  if (Object.keys(cart).length === 0) {
    footer.innerHTML = `
        <th scope="row" colspan="5" class="text-center text-info">Carrito vacío¡Comience a comprar!</th>
        `;
    return
  }

  const nCantidad = Object.values(cart).reduce(
    (acum, { cantidad }) => acum + cantidad,
    0
  );
  const nPrecio = Object.values(cart).reduce(
    (acum, { cantidad, precio }) => acum + cantidad * precio,
    0
  );
  //console.log(nPrecio);
  templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
  templateFooter.querySelector("span").textContent = nPrecio;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  const btnVaciar = document.getElementById('vaciar-cart')
  btnVaciar.addEventListener('click', (e) => {
    cart = {}
    e.preventDefault()
    //location.reload()
    paintCart()
  })
};
function btnAccion (e) {
  console.log(e.target);
  //acción de aumentar
  if (e.target.classList.contains('btn-num-product-up')) {
      //console.log(cart[e.target.dataset.id]);
      const producto = cart[e.target.dataset.id]
      producto.cantidad++
      cart[e.target.dataset.id] = {...producto}
      paintCart()
  }   
  if (e.target.classList.contains('btn-num-product-down')) {
      const producto = cart[e.target.dataset.id]
      producto.cantidad--
      if (producto.cantidad === 0) {
          delete cart[e.target.dataset.id]
      }
      
      paintCart()
  }   
  e.stopPropagation()
}

/* 









 */
