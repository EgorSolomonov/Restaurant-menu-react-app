import React from "react";
import Spinner from "../Components/Spinner/Spinner";

const InsideProductCard = React.lazy(({ setLoggedData }) =>
  import("../Components/Product/InsideProductCard")
);

const Product = React.memo(({ userEmail }) => {
  return (
    <React.Suspense fallback={<Spinner />}>
      <InsideProductCard userEmail={userEmail} setLoggedData={setLoggedData} />
    </React.Suspense>
  );
});

export default Product;
