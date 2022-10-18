import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Menu from "./Container/Menu";
import Basket from "./Container/Basket";
import Product from "./Container/Product";
import Registration from "./Container/Registration";
import NoMatch from "./Container/NoMatch";
import Login from "./Container/Login";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { checkPrice, setBasketForLoggedUser } from "./Slices/basketSlice";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let userArr = JSON.parse(localStorage.getItem("userArr"));
  const rememberedProductId = localStorage.getItem("prodId"); // Данные страницы для перехода на нее же после перезагрузки
  const [loggedData, setLoggedData] = useState(user); // Данные залогинившегося юзера (не стал делать отдельный слайс)

  useEffect(() => {
    userArr?.forEach((user) => {
      if (user.loggedIn) setLoggedData(user);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(checkPrice(loggedData.email));
    dispatch(setBasketForLoggedUser(loggedData.email));
  }, [dispatch, loggedData.email]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/signin"
          element={
            user.subscribed ? (
              <Navigate replace to="/login" />
            ) : (
              <Registration />
            )
          }
        />

        <Route
          path="/login"
          element={
            loggedData?.loggedIn ? (
              <Navigate replace to="/" />
            ) : (
              <Login setLoggedData={setLoggedData} />
            )
          }
        />

        <Route
          path="/"
          element={
            loggedData?.loggedIn ? (
              <Menu
                userEmail={loggedData.email}
                setLoggedData={setLoggedData}
              />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />

        <Route
          path="/basket"
          element={
            loggedData?.loggedIn ? (
              <Basket
                userEmail={loggedData?.email}
                setLoggedData={setLoggedData}
              />
            ) : (
              <Navigate replace to="/basket" />
            )
          }
        />

        <Route
          path="/product/:id"
          element={
            loggedData?.loggedIn ? (
              <Product
                userEmail={loggedData.email}
                setLoggedData={setLoggedData}
              />
            ) : (
              <Navigate replace to={`/product/${rememberedProductId}`} />
            )
          }
        />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
};

export default App;
