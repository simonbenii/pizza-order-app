async function getPizzas() {
  const response = await fetch("/api/list", {
    method: "GET",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
  });

  return response.json();
}

async function getAllAllergen() {
  const response = await fetch("/api/allergen", {
    method: "GET",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
  });

  return response.json();
}

function loadEvent() {
  loadWebsite();
  //listPizzas();
  //addEventListenerToAllBasket();
  addAllergensToMultiSelect();
}

window.addEventListener("load", loadEvent);

const getRootElement = () => document.getElementById("root");

const listPizzaDataHTML = (pizza) => `
  <div id="pizza-box">
    <div id="pizza-img"><img class="pizza-img" src="${pizza.img}" alt="Marinara"></div>
    <h1 id="pizza-name">${pizza.name}</h1>
    <p id="pizza-ingredients">${pizza.ingredients.join(", ")}</p>
    <p id="pizza-price">${pizza.price} <span class="forint">Ft</span></p>
    <div class="counter">
      <span class="down" onClick='decreaseCount(event, this)'>-</span>
      <input id="counterInput${pizza.id}" type="text" value="1">
      <span class="up"  onClick='increaseCount(event, this)'>+</span>
      <i id="cart${pizza.id}" class="bi bi-cart4"></i>
    </div>
  </div>
`;

const loadWebsite = () => {
  //getRootElement().insertAdjacentHTML("beforeend", `<div id="title">Pizza Menu </div> `);
  getRootElement().insertAdjacentHTML("beforeend", '<div id="card-box"></div>');

  getPizzas().then((data) => {
    listPizzas(data);
  });
};

const listPizzas = (pizzas) => {
  const cardBox = document.getElementById("card-box");
  cardBox.innerHTML = "";
  pizzas.forEach((pizza) => {
    cardBox.insertAdjacentHTML("beforeend", listPizzaDataHTML(pizza));
  });
  addEventListenerToAllBasket(pizzas);
};

const addEventListenerToAllBasket = (pizzas) => {
  const cartContent = getCartContent();
  pizzas.forEach((pizza) => {
    document.getElementById(`cart${pizza.id}`).addEventListener("click", () => {
      const counter = document.getElementById(`counterInput${pizza.id}`);
      if (cartContent.find((pz) => pz.id === pizza.id)) {
        cartContent.find((pz) => pz.id === pizza.id).amount = counter.value;
      } else {
        const pizzaObject = { id: pizza.id, amount: counter.value, pizzaName: pizza.name, price: pizza.price * counter.value, img: pizza.img };
        cartContent.push(pizzaObject);
      }
      addCartContet(cartContent);
    });
  });
};

const multiSelect = () => document.getElementById("multiSelect");
const addAllergensToMultiSelect = () => {
  getAllAllergen().then((data) => {
    data.forEach((allergen) => {
      multiSelect().insertAdjacentHTML("beforeend", `<option value="${allergen.id}">${allergen.name}</option>`);
      multiSelect().loadOptions();
    });
  });
  selectedOptionsHandler();
};

const selectedOptionsHandler = () => {
  let pizzas;
  getPizzas().then((data) => {
    pizzas = data;
  });
  const getAllOptionElements = document.querySelector("select");
  getAllOptionElements.addEventListener("change", () => {
    const selectedAllergensId = [];
    if (multiSelect().selectedOptions[0]) {
      for (const pizza of multiSelect().selectedOptions) {
        selectedAllergensId.push(Number(pizza.value));
      }
    }

    const filteredPizzas = pizzas.filter((pizza) => !selectedAllergensId.find((allergenId) => pizza.allergens.includes(allergenId)));
    listPizzas(filteredPizzas);
  });
};

const getCartContent = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

const addCartContet = (content) => {
  localStorage.setItem("cart", JSON.stringify(content));
};
