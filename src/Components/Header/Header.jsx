import "./Header.scss";
import Basket from "../../img/Header/Vector.svg";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div className="header">
      <h1 className="header__title">наша продукция</h1>

      <div className="header__product-basket">
        <div className="header__product-basket-text">
          <span>{`${
            props.productAmount.length < 4
              ? props.productAmount.length + " товара"
              : props.productAmount.length >= 5 ||
                props.productAmount.length === 0
              ? props.productAmount.length + " товаров"
              : props.productAmount.length + " товар"
          } `}</span>
          <span>на сумму {props.finalSum} ₽</span>
        </div>
        <Link to="/basket">
          <div className="header__product-basket-button">
            <img src={Basket} alt="basket" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
