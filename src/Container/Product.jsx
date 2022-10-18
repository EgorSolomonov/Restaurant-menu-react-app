import React from "react";
import Spinner from "../Components/Spinner/Spinner";

const InsideProductCard = React.lazy(() =>
  import("../Components/Product/InsideProductCard")
);

const Product = React.memo(({ userEmail }) => {
  return (
    <React.Suspense fallback={<Spinner />}>
      <InsideProductCard userEmail={userEmail} />
    </React.Suspense>
  );
});

export default Product;
