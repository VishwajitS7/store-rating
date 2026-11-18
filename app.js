const stores = [
  { id: "urban-market", name: "Urban Market", icon: "🥬" },
  { id: "green-basket", name: "Green Basket", icon: "🍎" },
  { id: "corner-shop", name: "Corner Shop", icon: "🛍️" },
];

const storageKey = "store-rating-v1";
const form = document.querySelector("#rating-form");
const storeSelect = document.querySelector("#store-select");
const ratingSelect = document.querySelector("#rating-select");
const storeList = document.querySelector("#store-list");
const formMessage = document.querySelector("#form-message");

function readRatings() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    return saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
  } catch {
    return {};
  }
}

let ratings = readRatings();

function renderStores() {
  storeList.replaceChildren();

  for (const store of stores) {
    const values = Array.isArray(ratings[store.id])
      ? ratings[store.id].filter((rating) => Number.isInteger(rating) && rating >= 1 && rating <= 5)
      : [];
    const average = values.length
      ? (values.reduce((sum, rating) => sum + rating, 0) / values.length).toFixed(1)
      : "—";
    const card = document.createElement("article");
    card.className = "store-card";

    const icon = document.createElement("div");
    icon.className = "store-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = store.icon;

    const name = document.createElement("h3");
    name.textContent = store.name;

    const summary = document.createElement("p");
    summary.className = "store-rating";
    const score = document.createElement("strong");
    score.textContent = `${average} ★`;
    summary.append(score, ` · ${values.length} ${values.length === 1 ? "rating" : "ratings"}`);

    card.append(icon, name, summary);
    storeList.append(card);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const storeId = storeSelect.value;
  const rating = Number(ratingSelect.value);
  if (!stores.some((store) => store.id === storeId) || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    formMessage.textContent = "Choose a store and a rating from 1 to 5.";
    return;
  }

  const previousRatings = Array.isArray(ratings[storeId])
    ? ratings[storeId].filter((value) => Number.isInteger(value) && value >= 1 && value <= 5)
    : [];
  const updatedRatings = { ...ratings, [storeId]: [...previousRatings, rating] };
  try {
    localStorage.setItem(storageKey, JSON.stringify(updatedRatings));
  } catch {
    formMessage.textContent = "Your browser couldn't save this rating. Please check your storage settings.";
    return;
  }

  ratings = updatedRatings;
  renderStores();
  formMessage.textContent = "Thanks! Your rating has been added.";
});

renderStores();
