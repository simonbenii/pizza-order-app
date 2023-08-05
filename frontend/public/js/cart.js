// import { fetchData } from './fetchData.js';

async function createOrder() {
  const currentDate = new Date();
  const submitButton = document.getElementById("submit");
  const existingArrayString = localStorage.getItem("cart");

  const order = {
    id: 1,
    pizzas: [],
    date: {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
      hour: currentDate.getHours(),
      minute: currentDate.getMinutes(),
    },
    customer: {
      name: "",
      email: "",
      address: {
        city: "",
        street: "",
      },
    },
  };

  submitButton.addEventListener("click", () => {
    order.pizzas = JSON.parse(existingArrayString);
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const city = document.getElementById("city").value;
    const street = document.getElementById("street").value;
    console.log(name);
    if (name !== "" && email !== "" && city !== "" && street !== "") {
      order.customer.name = name;
      order.customer.email = email;
      order.customer.address.city = city;
      order.customer.address.street = street;
      sendOrderToServer(order);
      clearLocalStorage("cart");
      window.location.href = "/";
    } else {
      window.alert("Please fill the personal informations!");
    }
  });
}

async function sendOrderToServer(bodys) {
  const response = await fetch("/api/order", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodys),
  });
}

function loadEvent() {
  createOrder();
  listOrderedPizzaDatas();
  closeButtonHandler();
}

const closeButtonHandler = () => {
  const buttons = document.getElementsByClassName("bi-x-circle-fill");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (event) => {
      const rowid = event.target.parentNode.id;
      const row = document.getElementById(rowid);
      //row.remove();
      const array = getCart();
      const index = array.findIndex((x) => x.id == rowid);
      array.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(array));
      loadEvent();
    });
  }
};


//<label style='font-size: 35px;' id=${pizza.id} for="orderedPizza"><i class="bi bi-x-circle-fill"></i>  ${pizza.amount}x   ${pizza.pizzaName} || ${pizza.price} HUF</label><br></br>

const listOrderedPizzaDatasHTML = (pizza) => `
  <div id="pizza-box">
  <div id="pizza-amount">${pizza.amount}x</div>
  <i class="bi bi-x-circle-fill"></i>
  <div id="pizza-img"><img class="pizza-img" src="${pizza.img}" alt="Marinara"></div>
  <h1 id="pizza-name">${pizza.pizzaName}</h1>
  <p id="pizza-price">${pizza.price} <span class="forint">Ft</span></p>
  </div>
`;

const listOrderedPizzaDatas = () => {
  const existingArrayString = localStorage.getItem("cart");
  const orderedPizza = JSON.parse(existingArrayString);
  document.getElementById("pizzaCart").innerHTML = "";
  document.getElementById("pizzaCart").insertAdjacentHTML("beforeend", '<div id="card-box"></div>');
  orderedPizza.forEach((pizza) => {
    document.getElementById("card-box").insertAdjacentHTML("beforeend", listOrderedPizzaDatasHTML(pizza));
  });
};

const clearLocalStorage = (key) => {
  localStorage.removeItem(key);
};

const getCart = () => {
  const cartArray = JSON.parse(localStorage.getItem("cart"));
  return cartArray;
};

window.addEventListener("load", loadEvent);

var form = document.getElementById("cart-form");
function handleForm(event) {
  event.preventDefault();
}
form.addEventListener("submit", handleForm);
