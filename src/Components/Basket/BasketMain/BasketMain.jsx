import "./BasketMain.scss";
import BasketProduct from "./Basket-products/BasketProduct";
import React from "react";
import { useSelector } from "react-redux";

const BasketMain = React.memo(({ uniqueBasket }) => {
  const amountOfProduct = useSelector((state) => state.basket.amountOfProduct); // хук получения стэйт из стора
  

  return (
    <main className="basket-main-wrapper">
      <div className="basket-main">
        {uniqueBasket?.map((item) => {
          return (
            <BasketProduct
              amount={
                1 +
                amountOfProduct.filter((prod) => +item.id === +prod.id).length
              } // подсчет кол-ва повторяющихся товаров для каждого товара отдельно по id
              item={item}
              key={item.id}
            />
          );
        })}
      </div>
    </main>
  );
});

export default BasketMain;
