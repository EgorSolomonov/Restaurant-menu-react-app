import BasketFooter from "../Components/Basket/BasketFooter/BasketFooter";
import BasketHeader from "../Components/Basket/BasketHeader/BasketHeader";
import React, { useEffect } from "react";
import Spinner from "../Components/Spinner/Spinner";
import "./Basket.scss";
import { useDispatch, useSelector } from "react-redux";
import { setUniqueBasket } from "../Slices/basketSlice";

const BasketMain = React.lazy(() =>
  import("../Components/Basket/BasketMain/BasketMain")
);

const Basket = React.memo(({ userEmail, setLoggedData }) => {
  const dispatch = useDispatch();
  const uniqueBasket = useSelector((state) => state.basket.uniqueBasket);
  const basket = useSelector((state) => state.basket.basket);

  useEffect(() => {
    if (basket.length !== 0) dispatch(setUniqueBasket());
  }, [dispatch, basket.length]);

  return (
    <>
      <BasketHeader userEmail={userEmail} setLoggedData={setLoggedData} />

      <React.Suspense fallback={<Spinner />}>
        <BasketMain uniqueBasket={uniqueBasket} />
      </React.Suspense>

      <BasketFooter />
    </>
  );
});

export default Basket;
