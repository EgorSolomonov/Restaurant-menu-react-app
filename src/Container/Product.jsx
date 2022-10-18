import React from "react";
import Spinner from "../Components/Spinner/Spinner";

const InsideProductCard = React.lazy(() =>
  import("../Components/Product/InsideProductCard")
);

const Product = React.memo(({ userEmail, setLoggedData }) => {
  return (
    <React.Suspense fallback={<Spinner />}>
      <InsideProductCard userEmail={userEmail} setLoggedData={setLoggedData} />
    </React.Suspense>
  );
});

export default Product;
