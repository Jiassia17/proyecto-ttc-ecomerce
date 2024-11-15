

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    paintCart();
    //console.log(cart);
    //console.log(items);
    
  }
});

/* Funciones para pintar cart de compras*/

const items = document.getElementById("items");
const templateSize = document.getElementById("size").content;
const templateFooter = document.getElementById("template-footer").content;
const templateCart = document.getElementById("template-cart").content;
const fragment = document.createDocumentFragment();




items.addEventListener("click", (e) => {
  btnAccion(e);
  //console.log(e.target);
});
function paintCart() {
  console.log(cart);
  items.innerHTML = "";
  Object.values(cart).forEach((producto) => {
    templateCart.querySelector(".column-1").textContent = producto.id;
    templateCart.querySelector(".column-2").textContent = producto.nombre;
    templateCart.getElementById("precio").textContent = producto.precio;
    templateCart.querySelector(".num-product").textContent = producto.cantidad;
    templateCart.querySelector(".btn-num-product-down").dataset.id =
      producto.id;
    templateCart.querySelector(".btn-num-product-up").dataset.id = producto.id;
    templateCart.querySelector(".column-5").textContent =
      producto.cantidad * producto.precio;
    const clone = templateCart.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
  paintFooter();
  localStorage.setItem("cart", JSON.stringify(cart));
  paintNumProd()
}

function paintFooter() {
  footer.innerHTML = "";
  if (Object.keys(cart).length === 0) {
    footer.innerHTML = `
          <th scope="row" colspan="5" class="text-center text-info">Carrito vacío¡Comience a comprar!</th>
          `;
    return;
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
  document.getElementById("precio_final").textContent = nPrecio
  document.getElementById("subtotal").textContent = nPrecio
  templateFooter.querySelector("span").textContent = nPrecio;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  const btnVaciar = document.getElementById("vaciar-cart");
  btnVaciar.addEventListener("click", (e) => {
    cart = {};
    e.preventDefault();
    //location.reload()
    paintCart();
  });
}
function btnAccion(e) {
  //acción de aumentar
  if (e.target.classList.contains("btn-num-product-up")) {
    //console.log(e.target);
    //console.log(cart[e.target.dataset.id]);
    const producto = cart[e.target.dataset.id];
    producto.cantidad++;
    cart[e.target.dataset.id] = { ...producto };
    paintCart();
  }
  if (e.target.classList.contains("btn-num-product-down")) {
    const producto = cart[e.target.dataset.id];
    producto.cantidad--;
    if (producto.cantidad === 0) {
      delete cart[e.target.dataset.id];
    }

    paintCart();
  }
  e.stopPropagation();
}
