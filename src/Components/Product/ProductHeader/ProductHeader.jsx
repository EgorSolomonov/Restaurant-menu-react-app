import "./ProductHeader.scss";
import Basket from "../../../img/Header/Vector.svg";
import { Link } from "react-router-dom";
import LogoutButton from "../../LogoutButton/LogoutButton";
import { useSelector } from "react-redux";

const ProductHeader = ({ userEmail }) => {
  const price = useSelector((state) => state.basket.price);
  const productAmount = useSelector((state) => state.basket.basket);

  return (
    <header className="header-card">
      <div className="header__header-wrapper">
        <Link to="/">
          <div className="basket-header__back-button">
            <p>
              <span>←</span>
            </p>
          </div>
        </Link>
        <div className="header__product-basket">
          {productAmount.length === 0 ? null : (
            <div className="header__product-basket-text">
              <span>{`${
                productAmount.length <= 4 && productAmount.length !== 1
                  ? productAmount.length + " товара"
                  : productAmount.length >= 5
                  ? productAmount.length + " товаров"
                  : productAmount.length + " товар"
              } `}</span>
              <p>на сумму {price} ₽</p>
            </div>
          )}
          <Link to="/basket">
            <div className="header__product-basket-button">
              <img src={Basket} alt="basket" />
            </div>
          </Link>
          <LogoutButton userEmail={userEmail} />
        </div>
      </div>
    </header>
  );
};

export default ProductHeader;
