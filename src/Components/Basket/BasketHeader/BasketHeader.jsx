import "./BasketHeader.scss";
import { Link } from "react-router-dom";
import LogoutButton from "../../LogoutButton/LogoutButton";

const BasketHeader = ({ userEmail, setLoggedData }) => {
  return (
    <header>
      <div className="basket-header">
        <Link to="/">
          <div className="basket-header__back-button">
            <p>
              <span>←</span>
            </p>
          </div>
        </Link>
        <h1 className="basket-header__title">Корзина с выбранными товарами</h1>
        <LogoutButton userEmail={userEmail} setLoggedData={setLoggedData} />
      </div>
    </header>
  );
};

export default BasketHeader;
