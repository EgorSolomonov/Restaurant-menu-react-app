import "./BasketProduct.scss";
import Emptyimg from "../../../../img/Main/empty-img.png";

const BasketProduct = (props) => {
  const { id, name, price } = props.item;

  return (
    <div className="basket-product-card">
      <div className="basket-product-card__img-container">
        <img
          src={!props.source ? Emptyimg : props.source}
          alt="product"
          className="basket-product-card__image"
        />
        <h6 className="basket-product-card__name">{name}</h6>
      </div>
      <div className="basket-product-card__price">
        <p className="amountTag">x{props.amount}</p>
        <p className="priceTag">{price} ₽</p>
        <span id={id} onClick={props.deleteProdById}>
          ×
        </span>
      </div>
    </div>
  );
};

export default BasketProduct;
