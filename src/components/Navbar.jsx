import { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "../styles/components/Navbar.module.css";
import { useCart } from "../context/useCart";
const Navbar = () => {
  const [cart] = useCart();
  let [mode, setMode] = useState("dark");

  const handleMode = () => {
    setMode(mode === "dark" ? (mode = "light") : (mode = "dark"));
    document.body.classList.toggle("light-mode");
  };

  return (
    <div className={classes.navbar}>
      <div className={`container ${classes.container}`}>
        <NavLink to="/" className={classes.logo}>
          Sasa Shop
        </NavLink>
        <ul className={classes.links}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="shop"
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ""
              }
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="cart"
              className={({ isActive }) =>
                isActive
                  ? `${classes.cart} ${classes.active}`
                  : `${classes.cart}`
              }
            >
              <div className={classes.icon}>
                <span>{cart.reduce((ac, el) => ac + +el.qty, 0)}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>cart-outline</title>
                  <path d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z" />
                </svg>
              </div>
              Cart
            </NavLink>
          </li>
        </ul>
        <button className={classes.mode} onClick={handleMode}>
          {mode === "dark" && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Dark Mode</title>
              <path d="M2 12A10 10 0 0 0 15 21.54A10 10 0 0 1 15 2.46A10 10 0 0 0 2 12Z" />
            </svg>
          )}

          {mode === "light" && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Light Mode</title>
              <path d="M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
