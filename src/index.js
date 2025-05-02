import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const saladsData = [
  {
    photo: "salad-images/shepherd's-salad.jpg",
    photoName: "shepherds-salad.jpg",
    name: "Shepherd's Salad",
    ingredients: "Tomato, Cucumber, Onion, Parsley, Olive oil, Lemon",
    price: 60,
    soldOut: false,
  },
  {
    photo: "salad-images/caesar-salad.jpg",
    photoName: "caesar-salad.jpg",
    name: "Caesar Salad",
    ingredients: "Lettuce, Chicken, Croutons, Parmesan, Caesar dressing",
    price: 85,
    soldOut: false,
  },
  {
    photo: "salad-images/tuna-salad.jpg",
    photoName: "tuna-salad.jpg",
    name: "Tuna Salad",
    ingredients: "Tuna, Corn, Lettuce, Olives, Tomato, Olive oil",
    price: 95,
    soldOut: false,
  },
  {
    photo: "salad-images/greek-salad.jpg",
    photoName: "greek-salad.jpg",
    name: "Greek Salad",
    ingredients: "Feta cheese, Olives, Tomato, Cucumber, Onion, Olive oil",
    price: 90,
    soldOut: true,
  },
  {
    photo: "salad-images/quinoa-salad.jpg",
    photoName: "quinoa-salad.jpg",
    name: "Quinoa Salad",
    ingredients: "Quinoa, Avocado, Tomato, Cucumber, Lemon juice",
    price: 110,
    soldOut: false,
  },
  {
    photo: "salad-images/beetroot-salad.jpg",
    photoName: "beetroot-salad.jpg",
    name: "Beetroot Salad",
    ingredients: "Boiled beetroot, Yogurt, Garlic, Walnuts, Olive oil",
    price: 75,
    soldOut: false,
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSoldOut, setShowSoldOut] = useState(true);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleSoldOutFilter = () => setShowSoldOut((prev) => !prev);

  const salads = saladsData.filter((salad) => showSoldOut || !salad.soldOut);
  // const salads = [];

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <Header />
      <ThemeToggle toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <Menu
        salads={salads}
        toggleSoldOut={toggleSoldOutFilter}
        showSoldOut={showSoldOut}
      />
      {salads.length > 0 && <Footer />}
      <Line />
    </div>
  );
}

function Header() {
  return <h1>React Salad Co.</h1>;
}

function ThemeToggle({ toggleDarkMode, darkMode }) {
  return (
    <div className="theme-toggle">
      <button onClick={toggleDarkMode}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}

function Menu({ salads, toggleSoldOut, showSoldOut }) {
  const length = salads.length;
  return (
    <main className="main">
      {length > 0 ? (
        <>
          <h2>Our Menu</h2>
          <h3 className="sentence">
            Crisp greens, juicy tomatoes, creamy cheeses, and bold flavors — our
            handcrafted salads aren't just a side dish, they're the main event
            your taste buds have been craving.
          </h3>
          <div className="filter-container">
            <button onClick={toggleSoldOut}>
              {showSoldOut ? "Hide Sold Out" : "Show Sold Out"}
            </button>
          </div>
          <div className="data">
            {salads.map((salad) => (
              <Salads sdata={salad} key={salad.name} />
            ))}
          </div>
        </>
      ) : (
        <p>Salads are out of stock. Please come back later.</p>
      )}
    </main>
  );
}

function Salads({ sdata }) {
  return (
    <div className={`general ${sdata.soldOut ? "sold-out" : ""}`}>
      <img src={sdata.photo} alt={sdata.photoName} />
      <div className="extra">
        <h3>{sdata.name}</h3>
        <h4>{sdata.ingredients}</h4>
        <span>{sdata.soldOut ? "Sold Out" : `$${sdata.price}`}</span>
      </div>
    </div>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order openHour={openHour} closeHour={closeHour} />
      ) : (
        <p>We're closed until {openHour}:00. Please come back later.</p>
      )}
      <Button isOpen={isOpen} />
    </footer>
  );
}

function Order({ openHour, closeHour }) {
  return (
    <p>
      We're open from {openHour}:00 to {closeHour}:00. We are waiting for you.
    </p>
  );
}

function Button({ isOpen }) {
  return (
    <div className={`mainBtn ${!isOpen ? "btnClose" : ""}`}>
      <button className="btn">Order</button>
    </div>
  );
}

function Line() {
  return <div className="page-bottom-line"></div>;
}

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
