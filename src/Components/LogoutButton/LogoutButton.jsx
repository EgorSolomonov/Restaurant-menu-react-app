import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSavedBasket } from "../../Slices/basketSlice";
import { setUserLoggedOut } from "../../Slices/userSlice";
import "./LogoutButton.scss";

const LogoutButton = React.memo(({ userEmail, setLoggedData }) => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.basket);

  return (
    <div className="header__log-out-button">
      <small>{userEmail}</small>
      <Link
        onClick={() => {
          dispatch(setUserLoggedOut(userEmail));
          dispatch(setSavedBasket({ basket, userEmail }));
          setLoggedData({});
        }}
        to="/"
      >
        <span>Выйти</span>
      </Link>
    </div>
  );
});

export default LogoutButton;
