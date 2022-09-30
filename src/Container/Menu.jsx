import Header from "../Components/Header/Header";
import React from "react";
import { useEffect, useState } from "react";
import Spinner from "../Components/Spinner/Spinner";

const Main = React.lazy(() => import("../Components/Main/Main"));

const Menu = React.memo((props) => {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://restaurant-small-api.herokuapp.com/"
      );

      if (response.status === 200) {
        let result = await response.json();
        setMenu(result);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <header>
        <Header
          finalSum={props.priceData.finalSum}
          productAmount={props.priceData.priceValue}
        />
      </header>
      <React.Suspense fallback={<Spinner />}>
        <main className="menu-main-wrapper">
          <Main menu={menu} setPrice={props.priceData.setPrice} />
        </main>
      </React.Suspense>
    </>
  );
});

export default Menu;
