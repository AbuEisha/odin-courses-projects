import { NavLink } from "react-router-dom";
import buttons from "../styles/components/button.module.css";
import classes from "../styles/pages/Cart.module.css";
import { useMemo } from "react";
import CartProduct from "../components/CartProduct";
import { useCart } from "../context/useCart";
const Cart = () => {
  const [cart, setCart] = useCart();

  let totalPrices = useMemo(() => {
    return cart.reduce((sum, item) => sum + +item.qty * +item.price, 0);
  }, [cart]);

  return (
    <>
      <div className={classes["cart-page"]}>
        <div className="container">
          <h2>Your Cart</h2>
          {cart.length === 0 && (
            <div className={classes.empty}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>cart-outline</title>
                <path d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z" />
              </svg>
              <p>Your Cart Is Empty</p>
              <NavLink to="/shop" className={buttons.btn}>
                Go To Shop
              </NavLink>
            </div>
          )}
          {cart.length !== 0 && (
            <button
              className={`${classes.delete} ${buttons.btn}`}
              onClick={() => setCart([])}
            >
              Clear All
            </button>
          )}
          <div className={classes.pruducts}>
            {cart.map((item) => (
              <CartProduct key={item.id} product={item} />
            ))}
          </div>
          {cart.length !== 0 && (
            <div className={classes["total-prices"]}>
              <div>
                Total Prices: <span>$ {totalPrices.toFixed(2)}</span>
              </div>
              <button className={`${classes.checkout} ${buttons.btn}`}>
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
