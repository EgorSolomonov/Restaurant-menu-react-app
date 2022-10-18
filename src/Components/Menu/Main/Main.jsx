import "./Main.scss";
import ProductCard from "../Main/Product-card/ProductCard";
import { Link } from "react-router-dom";

const Main = ({ menu }) => {
  return (
    <main className="menu-main-wrapper">
      {menu?.menuList?.map((item) => {
        return (
          <Link to={`/product/${item.id}`} key={item.id}>
            <ProductCard item={item} source={item.pictureUrl} />
          </Link>
        );
      })}
    </main>
  );
};

export default Main;
