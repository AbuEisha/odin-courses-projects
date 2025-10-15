import { NavLink } from "react-router-dom";
import classes from "../styles/pages/Home.module.css";
import buttons from "../styles/components/button.module.css";
const Home = () => {
  return (
    <div className={classes["home-page"]}>
      <div className={classes["intro-text"]}>
        <h1>Welcome To Sasa Shop</h1>
        <p>
          An online store that offers your range of products or services with an
          easy-to-use design, detailed product pages, and secure electronic
          payment options. It ensures order tracking, fast customer support, and
          clear return policies to build trust and boost sales.
        </p>
        <NavLink to="shop" className={buttons.btn}>
          Shop
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
