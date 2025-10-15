import { NavLink } from "react-router-dom";
import classes from "../styles/pages/ErrorPage.module.css";
import buttons from "../styles/components/button.module.css";

const ErrorPage = () => {
  return (
    <div className={classes["error-page"]}>
      <p>404 Page Not Found</p>
      <NavLink to="/" className={buttons.btn}>
        Go Back Home
      </NavLink>
    </div>
  );
};

export default ErrorPage;
