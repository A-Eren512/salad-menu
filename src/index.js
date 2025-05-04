import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const saladsData = [
  {
    id: 1,
    photo: "salad-images/shepherd's-salad.jpg",
    photoName: "shepherds-salad.jpg",
    name: "Shepherd's Salad",
    ingredients: "Tomato, Cucumber, Black Onion, Parsley, Olive oil, Lemon",
    price: 60,
    soldOut: false,
    stock: 5,
  },
  {
    id: 2,
    photo: "salad-images/caesar-salad.jpg",
    photoName: "caesar-salad.jpg",
    name: "Caesar Salad",
    ingredients: "Lettuce, Chicken, Croutons, Parmesan, Caesar dressing",
    price: 85,
    soldOut: false,
    stock: 5,
  },
  {
    id: 3,
    photo: "salad-images/tuna-salad.jpg",
    photoName: "tuna-salad.jpg",
    name: "Tuna Salad",
    ingredients: "Tuna, Corn, Lettuce, Olives, Tomato, Black Onion, Olive oil",
    price: 95,
    soldOut: false,
    stock: 5,
  },
  {
    id: 4,
    photo: "salad-images/greek-salad.jpg",
    photoName: "greek-salad.jpg",
    name: "Greek Salad",
    ingredients: "Feta cheese, Olives, Tomato, Cucumber, Onion, Olive oil",
    price: 90,
    soldOut: false,
    stock: 5,
  },
  {
    id: 5,
    photo: "salad-images/quinoa-salad.jpg",
    photoName: "quinoa-salad.jpg",
    name: "Quinoa Salad",
    ingredients:
      "Quinoa, Avocado, Tomato, Cucumber, Lemon juice, black cabbage",
    price: 110,
    soldOut: false,
    stock: 5,
  },
  {
    id: 6,
    photo: "salad-images/beetroot-salad.jpg",
    photoName: "beetroot-salad.jpg",
    name: "Beetroot Salad",
    ingredients:
      "Boiled beetroot, Yogurt, Garlic, Walnuts, Olive oil, black cabbage",
    price: 75,
    soldOut: false,
    stock: 5,
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  const [showSoldOut, setShowSoldOut] = useState(true);
  const [cart, setCart] = useState([]);
  const [salads, setSalads] = useState(saladsData);
  const [showNotification, setShowNotification] = useState(false);

  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour < closeHour;

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  const toggleSoldOutFilter = () => setShowSoldOut((prev) => !prev);

  const handleAddToCart = (salad) => {
    if (isOpen && salad.stock > 0) {
      setSalads((prev) =>
        prev.map((item) =>
          item.id === salad.id ? { ...item, stock: item.stock - 1 } : item
        )
      );
      setCart((prevCart) => [...prevCart, salad]);

      if (salad.stock - 1 === 0) {
        setSalads((prev) =>
          prev.map((item) =>
            item.id === salad.id ? { ...item, soldOut: true } : item
          )
        );
      }
    } else {
      setShowNotification(true);
    }
  };

  const handlePlaceOrder = () => {
    if (isOpen) {
      setShowNotification(true);
      setCart([]);
      const allSoldOut = salads.every((salad) => salad.soldOut);
      if (allSoldOut) setShowSoldOut(false);
    } else {
      setShowNotification(true);
    }
  };

  const filteredSalads = showSoldOut
    ? salads
    : salads.filter((salad) => !salad.soldOut);

  if (salads.every((salad) => salad.soldOut) && cart.length === 0) {
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  const allSoldOut = salads.every((salad) => salad.soldOut);
  const cartEmpty = cart.length === 0;

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      {showNotification && isOpen && (
        <div className="notification-modal show">
          <div className="notification-content">
            <h2>Your order has been placed!</h2>
            <p>Thank you! Your order has been successfully placed.</p>
            <button
              className="notification-button"
              onClick={() => setShowNotification(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <LineTop />
      <Header />

      <div className="top-bar">
        <Basket cart={cart} />
        <ThemeToggle toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      </div>

      {allSoldOut && cartEmpty ? (
        <div className="out-of-stock-message" style={{ marginTop: "30px" }}>
          <h2>Salads are out of stock. Please come back later.</h2>
        </div>
      ) : isOpen ? (
        <Menu
          salads={filteredSalads}
          toggleSoldOut={toggleSoldOutFilter}
          showSoldOut={showSoldOut}
          handleAddToCart={handleAddToCart}
          cart={cart}
          isOpen={isOpen}
        />
      ) : (
        <div className="closed-message" style={{ marginTop: "30px" }}>
          <h2>
            We're closed until to 12.00 p.m. Please come back at 12.00 p.m.
          </h2>
        </div>
      )}

      <Footer
        handlePlaceOrder={handlePlaceOrder}
        isOpen={isOpen}
        cart={cart}
        salads={salads}
      />
      <LineBottom />
    </div>
  );
}

function Header() {
  return <h1>Green Delights</h1>;
}

function Basket({ cart }) {
  return (
    <div className="basket-icon">
      <FontAwesomeIcon icon={faBasketShopping} />
      {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
    </div>
  );
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

function Menu({ salads, toggleSoldOut, showSoldOut, handleAddToCart, isOpen }) {
  return (
    <main className="main">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <h2>Our Menu</h2>
        <h3>Fresh salads crafted with care and love</h3>
      </div>
      <div className="filter-container">
        <button onClick={toggleSoldOut}>
          {showSoldOut ? "Hide Sold Out" : "Show Sold Out"}
        </button>
      </div>
      <div className="data">
        {salads.map((salad, index) => (
          <Salads
            key={salad.name}
            sdata={salad}
            index={index}
            handleAddToCart={handleAddToCart}
            isOpen={isOpen}
          />
        ))}
      </div>
    </main>
  );
}

function Salads({ sdata, handleAddToCart, isOpen, index }) {
  return (
    <div
      className={`general ${sdata.soldOut ? "sold-out" : ""}`}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => !sdata.soldOut && isOpen && handleAddToCart(sdata)}
    >
      <img src={sdata.photo} alt={sdata.photoName} />
      <div
        className="extra"
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        <h3>{sdata.name}</h3>
        <h4>{sdata.ingredients}</h4>
        <span>{sdata.soldOut ? "Sold Out" : `$${sdata.price}`}</span>
        <h5>
          <span className="stock-label">STOCK:</span>{" "}
          <span className="stock-count">{sdata.stock}</span>
        </h5>
      </div>
    </div>
  );
}

function Footer({ handlePlaceOrder, isOpen, cart, salads }) {
  const allSoldOut = salads.every((salad) => salad.soldOut);
  const isCartEmpty = cart.length === 0;

  if (isCartEmpty && allSoldOut) return null;

  return (
    <footer className="footer">
      {isOpen && (
        <>
          <p>We're open from 12:00 p.m. to 22:00 p.m.</p>
          {isCartEmpty && !allSoldOut && (
            <p className="info-msg">
              You haven't added any salads yet. Select your favorite!
            </p>
          )}
          {allSoldOut && (
            <p className="sold-out-msg">
              All salads are sold out. Thank you for your interest!
            </p>
          )}
        </>
      )}
      <div className={`mainBtn ${isCartEmpty ? "btnClose" : ""}`}>
        <button
          className="btn"
          onClick={handlePlaceOrder}
          disabled={isCartEmpty || !isOpen}
        >
          Order Now
        </button>
      </div>
    </footer>
  );
}

function LineBottom() {
  return <div className="page-bottom-line"></div>;
}

function LineTop() {
  return <div className="page-top-line"></div>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
