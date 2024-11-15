
const numProd = document.querySelector(".bg-prod");
const numViews = document.querySelector(".bg-views");
function paintNumProd() {
  if (localStorage.getItem("cart")) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    numProd.textContent = Object.values(cart).reduce(
      (acum, { cantidad }) => acum + cantidad,
      0
    );
  } else {
    numProd.textContent = 0;
    numViews.textContent = 0;
  }
}


/*  [ Filter / Search product ]*/
document.addEventListener("DOMContentLoaded", function () {
    paintNumProd()
    
    
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

