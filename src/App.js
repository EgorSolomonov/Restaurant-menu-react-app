import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Menu from "./Container/Menu";
import Basket from "./Container/Basket";

const App = () => {
  // Подсчет цены, с пробросом в оба компонента
  const [price, setPrice] = useState(null);

  const priceValue = [];

  price?.forEach((item) => {
    if (item.price.includes(" "))
      priceValue.push(+item.price.split(" ").join(""));
    else priceValue.push(+item.price);
  });

  let finalSum = priceValue.reduce((acc, item) => acc + item, 0);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Menu priceData={{ setPrice, finalSum, priceValue }} />}
        ></Route>

        <Route
          path="/basket"
          element={<Basket priceData={{ setPrice, finalSum }} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
