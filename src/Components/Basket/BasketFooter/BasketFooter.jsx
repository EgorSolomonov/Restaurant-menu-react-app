import { useEffect } from "react";
import "./BasketFooter.scss";

const BasketFooter = (props) => {
  let keys = Object.keys(localStorage);

  useEffect(() => {
    props.setPrice(JSON.parse(localStorage.getItem(keys)));
  }, []);

  const clearBasket = () => {
    localStorage.clear();
    props.setBasket(JSON.parse(localStorage.getItem(keys)));
    props.setPrice(JSON.parse(localStorage.getItem("array")));
  };

  return (
    <div className="basket-footer">
      <div className="basket-footer__order-data">
        <div className="basket-footer__price-info">
          <h2>Заказ на сумму:</h2>
          <p>{props.finalSum} ₽</p>
        </div>
        <div className="basket-footer__order-button">
          <span onClick={clearBasket}>Очистить корзину</span>
          <span>Оформить заказ</span>
        </div>
      </div>
    </div>
  );
};

export default BasketFooter;
