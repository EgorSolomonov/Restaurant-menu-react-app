import "./InsideProductCard.scss";
import React from "react";
import ProductHeader from "./ProductHeader/ProductHeader";
import Card from "./Card/Card";

const InsideProductCard = React.memo(({ userEmail }) => {
  return (
    <div className="product">
      <ProductHeader userEmail={userEmail} />
      <Card />
    </div>
  );
});
export default InsideProductCard;
