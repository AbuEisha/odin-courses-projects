import { useState } from "react";
import classes from "../styles/components/CartProduct.module.css";
import buttons from "../styles/components/button.module.css";
import { useCart } from "../context/useCart";
const CartProduct = ({ product }) => {
  const [qty, setQty] = useState(+product.qty);
  const [, setCart] = useCart();

  const updateQty = (id, nextQty) => {
    setQty(+nextQty);
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: nextQty } : item))
    );
  };

  return (
    <div id={product.id} className={classes.product}>
      <img src={product.image} alt={product.title} width="100" />
      <div className={classes["pro-info"]}>
        <h3>{product.title}</h3>
        <p className={classes.price}>$ {product.price}</p>
      </div>
      <div className={classes.info}>
        <button
          className={`${classes.delete} ${buttons.btn}`}
          onClick={() =>
            setCart((prev) => prev.filter((item) => item.id !== product.id))
          }
        >
          Clear
        </button>
        <div className={classes.quantity}>
          <button
            onClick={() =>
              qty !== 1 ? updateQty(product.id, +qty - 1) : false
            }
          >
            -
          </button>
          <input
            type="number"
            name="quantity"
            value={qty}
            min="1"
            onChange={(e) =>
              e.target.value >= 1
                ? updateQty(product.id, e.target.value)
                : false
            }
          />
          <button onClick={() => updateQty(product.id, +qty + 1)}>+</button>
        </div>
        <div className={classes["total-pro"]}>
          Total:{" "}
          <span>
            $ <span>{(+qty * +product.price).toFixed(2)}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
