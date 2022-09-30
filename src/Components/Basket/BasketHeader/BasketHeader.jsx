import "./BasketHeader.scss";
import { Link } from "react-router-dom";

const BasketHeader = () => {
  return (
    <div className="basket-header">
      <Link to="/">
        <div className="basket-header__back-button">
          <p>
            <span>←</span>
          </p>
        </div>
      </Link>
      <h1 className="basket-header__title">Корзина с выбранными товарами</h1>
    </div>
  );
};

export default BasketHeader;
