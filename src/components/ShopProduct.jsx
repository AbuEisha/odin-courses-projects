import { useState } from "react";
import classes from "../styles/components/ShopProduct.module.css";
import buttons from "../styles/components/button.module.css";
import { useCart } from "../context/useCart";

const ShopProduct = ({ product }) => {
  const [qty, setQty] = useState(1);
  const [, setCart] = useCart();

  const addingToCart = (product) => {
    const item = {
      id: product.id,
      title: product.title,
      price: +product.price,
      image: product.image,
      qty: +qty,
    };
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: +i.qty + +item.qty } : i
        );
      }
      return [...prev, item];
    });
    setQty(1);
  };

  return (
    <div className={classes.product} id={product.id}>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <div className={classes.rating}>
        <span>⭐ {product.rating.rate}</span>
        <span>( {product.rating.count} )</span>
      </div>
      <p className={classes.price}>
        $ <span>{product.price}</span>
      </p>
      <div className={classes.quntity}>
        <button onClick={() => (qty !== 1 ? setQty(+qty - 1) : false)}>
          -
        </button>
        <input
          type="number"
          name="quantity"
          value={qty}
          min="1"
          onChange={(e) =>
            e.target.value >= 1 ? setQty(e.target.value) : false
          }
        />
        <button onClick={() => setQty(+qty + 1)}>+</button>
      </div>
      <button
        className={`${classes.btn} ${buttons.btn}`}
        onClick={() => addingToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ShopProduct;
