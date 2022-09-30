import "./ProductCard.scss";
import Emptyimg from "../../../img/Main/empty-img.png";

const ProductCard = (props) => {
  const { id, name, price, dishWeight, description } = props.item;

  return (
    <div className="product-card">
      <img
        src={!props.source ? Emptyimg : props.source}
        alt="product"
        className="product-card__image"
      />
      <h6 className="product-card__name">{name}</h6>
      <p className="product-card__description">{description}</p>
      <div className="product-card__price">
        <p>
          <span className="product-card__price_price-data">{price} ₽ / </span>
          <span>
            {dishWeight.length !== 1 ? `${dishWeight} г.` : `${dishWeight} шт.`}
          </span>
        </p>
        <a id={id} onClick={props.addToBasket} href="#">
          +
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
