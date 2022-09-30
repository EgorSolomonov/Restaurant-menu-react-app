import BasketFooter from "../Components/Basket/BasketFooter/BasketFooter";
import BasketHeader from "../Components/Basket/BasketHeader/BasketHeader";
import React, { useEffect, useState } from "react";
import Spinner from "../Components/Spinner/Spinner";

const BasketMain = React.lazy(() =>
  import("../Components/Basket/BasketMain/BasketMain")
);

const Basket = React.memo((props) => {
  // Выведение выбранных товаров в корзине
  const [basket, setBasket] = useState(null);

  let keys = Object.keys(localStorage);
  let uniqueArr = [];
  let amountOfProduct = [];
  let amount = 1;

  useEffect(() => {
    setBasket(JSON.parse(localStorage.getItem(keys)));
  }, []);

  function itemCheck(item) {
    // Функция делящая товары на уникальные и повторяющиеся
    if (uniqueArr.indexOf(item.id) === -1) {
      uniqueArr.push(item.id); // Push в массив с уникальными товарами, с последующим выведением в корзине
      return true;
    }
    amountOfProduct.push(item); // Push повторяющихся товаров в массив с похожими товарами, с последующим подсчетом кол-ва выбранных товаров
    return false;
  }

  uniqueArr = basket?.filter((item) => itemCheck(item)); // Присвоение массиву уникальных товаров прошедших функцию продуктов фильтрации

  const deleteProdById = (e) => {
    setBasket(
      localStorage.setItem(
        "array",
        JSON.stringify(
          basket?.filter((item) => +e.currentTarget.id !== +item.id)
        )
      )
    ); // Фильтрация корзины, удаление по id, обновление корзины

    setBasket(JSON.parse(localStorage.getItem(keys))); // Ререндеринг корзины

    props.priceData.setPrice(JSON.parse(localStorage.getItem("array"))); // Ререндеринг цены
  };

  return (
    <>
      <header>
        <BasketHeader />
      </header>
      <React.Suspense fallback={<Spinner />}>
        <main
          className="basket-main-wrapper"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <BasketMain
            uniqueArr={uniqueArr}
            amount={amount}
            amountOfProduct={amountOfProduct}
            deleteProdById={deleteProdById}
          />
        </main>
      </React.Suspense>

      <footer>
        <BasketFooter
          setPrice={props.priceData.setPrice}
          finalSum={props.priceData.finalSum}
          setBasket={setBasket}
        />
      </footer>
    </>
  );
});

export default Basket;
