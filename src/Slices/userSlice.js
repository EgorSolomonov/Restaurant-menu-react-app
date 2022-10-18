import { createSlice } from "@reduxjs/toolkit";

// начальный стэйт
const initialState = {
  email: "",
  password: "",
  subscribed: false,
  loggedIn: false,
};

// создание слайса
export const userSlice = createSlice({
  name: "user", // название слайса
  initialState, // начальный стэйт для слайса

  // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
  // объект редьюсер слайса с возможностью прямой мутации данных, при помощи черновика от пакета Immer
  // внутри нельзя делать сайд эффекты
  reducers: {
    // экшн объект
    setUserData: (state, action) => {
      state.email = action.payload.data[0].toLowerCase();
      state.password = action.payload.data[1];
      state.subscribed = action.payload.data[2];

      //Сохранение данных юзера в массив локалсторидж, если данные регистрации введены корректно
      let keys = Object.keys(localStorage);

      if (keys.length !== 0) {
        let userArr = JSON.parse(localStorage.getItem("userArr"));
        userArr.push({
          email: state.email,
          password: state.password,
          subscribed: state.subscribed,
        });
        localStorage.setItem("userArr", JSON.stringify(userArr));
      } else
        localStorage.setItem(
          "userArr",
          JSON.stringify([
            {
              email: state.email,
              password: state.password,
              subscribed: state.subscribed,
            },
          ])
        );
    },

    setUserLoggedIn: (state, action) => {
      // Проверка юзера в локалсторидж на авторизацию

      let keys = Object.keys(localStorage);
      if (keys.length !== 0) {
        let userArr = JSON.parse(localStorage.getItem("userArr"));

        userArr.forEach((user) => {
          if (
            user.email === action.payload.email &&
            +user.password === +action.payload.password
          ) {
            //  авторизируем юзера
            user.loggedIn = true;
            localStorage.setItem("userArr", JSON.stringify(userArr));
          } else user.loggedIn = false;
        });
      }
    },

    setUserLoggedOut: (state, action) => {
      let userArr = JSON.parse(localStorage.getItem("userArr"));

      userArr.forEach((user) => {
        if (user.email === action.payload) delete user.loggedIn;
      });
      localStorage.setItem("userArr", JSON.stringify(userArr));
    },
  },
});

// экспорт экшен объектов
export const { setUserData, setUserLoggedIn, setUserLoggedOut } =
  userSlice.actions;

export default userSlice.reducer; // Дефолтный экспорт редьюсера, потом можно переименовать в импорте
