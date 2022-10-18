import "./ProductCard.scss";
import Emptyimg from "../../../../img/Main/empty-img.png";
import { addToBasket, checkPrice } from "../../../../Slices/basketSlice";
import { useDispatch } from "react-redux";

const ProductCard = (props) => {
  const { id, name, price, dishWeight, description, pictureUrl } = props.item;
  const dispatch = useDispatch(); // хук получения и вызова метода dispatch в редьюсере

  return (
    <div className="product-card">
      <img
        src={!props.source ? Emptyimg : props.source}
        alt="product"
        className="product-card__image"
      />
      <span className="product-card__name">{name}</span>
      <p className="product-card__description">
        {description.length > 124
          ? `${Array.from(description).slice(0, 100).join("")}...`
          : description}
      </p>
      <div className="product-card__price">
        <p>
          <span className="product-card__price_price-data">{price} ₽ / </span>
          <span>
            {dishWeight.length !== 1 ? `${dishWeight} г.` : `${dishWeight} шт.`}
          </span>
        </p>
        <span
          className="product-card__plus"
          id={id}
          onClick={(e) => {
            e.preventDefault();
            dispatch(addToBasket({ id, name, price, description, pictureUrl }));
            dispatch(checkPrice());
          }}
        >
          +
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
