const loadedPizzas = [];
const loadedOrders = [];
const root = document.getElementById("card-box");

async function displayOrders() {
  await loadOrders();
  await loadPizza();
  //root.innerHTML = "";
  loadedOrders.forEach((order, index) => {
    root.insertAdjacentHTML(
      "beforeend",
      `<div class="orders" id="${index}"><div class="content"><p>Name: ${order.customer.name}</p>
      <p>E-mail: ${order.customer.email}</p>
      <p>City: ${order.customer.address.city}</p>
      <p>Street: ${order.customer.address.street}</p>
      <p>Order Time: ${order.date.year}-${order.date.month}-${order.date.day} ${order.date.hour}:${order.date.minute}</p></div></div>`
    );
    const orderDiv = document.getElementById(index);
    order.pizzas.forEach((pizza) => {
      orderDiv.insertAdjacentHTML(
        "beforeend",
        `<div class="content"><p>Pizza name: ${pizza.pizzaName}</p>
      <p>Amount: ${pizza.amount}</p></div>`
      );
    });
  });
}

async function getAllOrder() {
  const response = await fetch("/api/order", {
    method: "GET",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
  });

  return response.json();
}

async function getPizzas() {
  const response = await fetch("/api/list", {
    method: "GET",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
  });

  return response.json();
}

async function loadOrders() {
  const orders = await getAllOrder();
  orders.forEach((data) => {
    loadedOrders.push(data);
  });
}

async function loadPizza() {
  const pizzas = await getPizzas();
  pizzas.forEach((pizza) => {
    loadedPizzas.push(pizza);
  });
}

function loadEvent() {
  displayOrders();
}

window.addEventListener("load", loadEvent);
