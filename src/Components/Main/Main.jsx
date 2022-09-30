import "./Main.scss";
import ProductCard from "./Product-card/ProductCard";
import { useEffect } from "react";

const Main = (props) => {
  let keys = Object.keys(localStorage);
  let productArr = [];

  useEffect(() => {
    props.setPrice(JSON.parse(localStorage.getItem(keys)));
  }, []);

  // props.setPrice(JSON.parse(localStorage.getItem(keys)));
  // console.log(keys, JSON.parse(localStorage.getItem(keys)));

  const addToBasket = (e) => {
    props.menu?.menuList.map((product) => {
      if (+e.currentTarget.id === +product.id) {
        if (keys.length !== 0) {
          productArr = JSON.parse(localStorage.getItem("array"));
          productArr.push(product);
          localStorage.setItem("array", JSON.stringify(productArr));
        } else localStorage.setItem("array", JSON.stringify([product]));
      }
    });
    props.setPrice(JSON.parse(localStorage.getItem("array")));
  };

  return (
    <div className="main">
      {props.menu?.menuList.map((item) => {
        return (
          <ProductCard
            addToBasket={addToBasket}
            item={item}
            source={item.pictureUrl}
            key={item.id}
          />
        );
      })}
    </div>
  );
};

export default Main;
