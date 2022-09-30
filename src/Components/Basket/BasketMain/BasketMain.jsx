import "./BasketMain.scss";
import BasketProduct from "./Basket-products/BasketProduct";
import React from "react";

const BasketMain = React.memo((props) => {
  return (
    <div className="basket-main">
      {props.uniqueArr?.map((item) => {
        return (
          <BasketProduct
            amount={
              props.amount +
              props.amountOfProduct.filter((prod) => +item.id === +prod.id)
                .length
            } // подсчет кол-ва повторяющихся товаров для каждого товара отдельно по id
            source={item.pictureUrl}
            item={item}
            key={item.id}
            deleteProdById={props.deleteProdById}
          />
        );
      })}
    </div>
  );
});

export default BasketMain;
