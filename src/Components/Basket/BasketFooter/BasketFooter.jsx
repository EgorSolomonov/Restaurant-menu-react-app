import "./BasketFooter.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllProds } from "../../../Slices/basketSlice";
import OrderButton from "../../OrderButton/OrderButton";

const BasketFooter = () => {
  let price = useSelector((state) => state.basket.price);
  const dispatch = useDispatch(); // хук получения и вызова метода dispatch в редьюсере

  return (
    <footer>
      <div className="basket-footer">
        <div className="basket-footer__order-data">
          <div className="basket-footer__price-info">
            <h2>Заказ на сумму:</h2>
            <p>{price} ₽</p>
          </div>
          <div className="basket-footer__order-button">
            <span className="clear" onClick={() => dispatch(deleteAllProds())}>
              Очистить корзину
            </span>
            <OrderButton />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BasketFooter;
