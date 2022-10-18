import "./Card.scss";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, setProductId } from "../../../Slices/productSlice";
import OrderButton from "../../OrderButton/OrderButton";
import Emptyimg from "../../../img/Main/empty-img.png";

const Card = React.memo(() => {
  const params = useParams();
  const dispatch = useDispatch(); // хук получения и вызова метода dispatch в редьюсере
  const productInfo = useSelector((state) =>
    state.product.product.menuList?.filter((item) => +item.id === +params.id)
  ); // хук получения стэйт из стора

  useEffect(() => {
    dispatch(getProducts()); // получаем и присваеваем массив продуктов
  }, [dispatch]);

  useEffect(() => {
    dispatch(setProductId(+params.id)); // сохранение id карточки
    // eslint-disable-next-line
  }, []);

  if (productInfo)
    return (
      <div className="card">
        <img
          src={
            productInfo[0]?.pictureUrl ? productInfo[0]?.pictureUrl : Emptyimg
          }
          alt=""
        />
        <div className="card__info">
          <h1 className="card__name">{productInfo[0]?.name}</h1>
          <p className="card__description">{productInfo[0]?.description}</p>
          <div className="card__order-info">
            <div className="card__price-info">
              <p>
                <span className="card__price_price-data">
                  {productInfo[0]?.price} ₽ /
                </span>
                <span className="card__price_weight-data">
                  {productInfo[0]?.dishWeight.length !== 1
                    ? `${productInfo[0]?.dishWeight} г.`
                    : `${productInfo[0]?.dishWeight} шт.`}
                </span>
              </p>
              <OrderButton />
            </div>
          </div>
        </div>
      </div>
    );
  else <h1>Продукт не найден....</h1>;
});

export default Card;
