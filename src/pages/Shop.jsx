import { useEffect, useState } from "react";
import classes from "../styles/pages/Shop.module.css";
import ShopProduct from "../components/ShopProduct";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [shuffle, setShuffle] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);

        const cats = [...new Set(data.map((p) => p.category))];
        setCategories(cats);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className={classes.loading}>Products Loading.....</p>;
  if (error) return <p>A Network Error Was Encountered</p>;
  return (
    <div className={classes["shop-page"]}>
      <ul className={classes.shuffle}>
        <div className={`container ${classes.container}`}>
          <li
            className={shuffle === "all" ? classes.active : ""}
            onClick={() => setShuffle("all")}
          >
            all
          </li>
          {categories.map((cat, index) => (
            <li
              key={index}
              onClick={() => setShuffle(cat)}
              className={shuffle === cat ? classes.active : ""}
            >
              {cat}
            </li>
          ))}
        </div>
      </ul>
      <div className="container">
        <h2>Shop Products</h2>
        <div className={classes.products}>
          {products.map(
            (p) =>
              (shuffle === "all" || shuffle === p.category) && (
                <ShopProduct key={p.id} product={p} />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
