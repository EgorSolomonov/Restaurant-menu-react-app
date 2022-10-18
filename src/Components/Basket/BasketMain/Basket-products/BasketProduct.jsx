import "./BasketProduct.scss";
import Emptyimg from "../../../../img/Main/empty-img.png";
import { deleteProd, minusPrice } from "../../../../Slices/basketSlice";
import { useDispatch } from "react-redux";

const BasketProduct = (props) => {
  const { id, name, price } = props.item;
  const amount = props.amount;
  const dispatch = useDispatch(); // хук получения и вызова метода dispatch в редьюсере

  return (
    <div className="basket-product-card">
      <div className="basket-product-card__img-container">
        <img
          src={!props.item.pictureUrl ? Emptyimg : props.item.pictureUrl}
          alt="product"
          className="basket-product-card__image"
        />
        <h6 className="basket-product-card__name">{name}</h6>
      </div>
      <div className="basket-product-card__price">
        <p className="amountTag">x{props.amount}</p>
        <p className="priceTag">{price} ₽</p>
        <span
          onClick={() => {
            dispatch(deleteProd(id));
            dispatch(minusPrice({ price, amount }));
          }}
        >
          ×
        </span>
      </div>
    </div>
  );
};

export default BasketProduct;
