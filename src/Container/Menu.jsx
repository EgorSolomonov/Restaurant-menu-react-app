import Header from "../Components/Menu/Header/Header";
import React, { useEffect } from "react";
import Spinner from "../Components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Slices/productSlice";

const Main = React.lazy(() => import("../Components/Menu/Main/Main"));

const Menu = React.memo(({ userEmail, setLoggedData }) => {
  const dispatch = useDispatch(); // хук получения и вызова метода dispatch в редьюсере
  const menu = useSelector((state) => state.product.product); // хук получения стэйт из стора

  useEffect(() => {
    dispatch(getProducts()); // получаем и присваеваем массив продуктов
  }, [dispatch]);

  return (
    <>
      <Header
        userEmail={userEmail}
        setLoggedData={setLoggedData}
      />

      <React.Suspense fallback={<Spinner />}>
        <Main menu={menu} />
      </React.Suspense>
    </>
  );
});

export default Menu;
