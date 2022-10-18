import { createSlice } from "@reduxjs/toolkit";

// начальный стэйт
const initialState = {
  basket: [],
  uniqueBasket: [],
  amountOfProduct: [],
  price: [],
};

// создание слайса
export const basketSlice = createSlice({
  name: "basket", // название слайса
  initialState, // начальный стэйт для слайса

  // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
  // объект редьюсер слайса с возможностью прямой мутации данных, при помощи черновика от пакета Immer
  // внутри нельзя делать сайд эффекты
  reducers: {
    // экшн объект
    addToBasket: (state, action) => {
      state.basket.push(action.payload);
    },

    deleteProd: (state, action) => {
      const newStateUnique = state.uniqueBasket.filter(
        (item) => item.id !== action.payload
      );

      const newStateSimple = state.basket.filter(
        (item) => item.id !== action.payload
      );

      state.uniqueBasket = newStateUnique;
      state.basket = newStateSimple;
    },

    deleteAllProds: () => {
      return initialState;
    },

    checkPrice: (state, action) => {
      // подсчет цены
      let savedBasketArr = JSON.parse(localStorage.getItem("savedBasket"));

      const priceValue = [];
      if (!action.payload)
        state.basket.forEach((item) => {
          if (item.price.includes(" "))
            priceValue.push(+item.price.split(" ").join(""));
          else priceValue.push(+item.price);

          state.price = priceValue.reduce((acc, item) => acc + item, 0);
        }, 0);
      else
        for (let userBasket of savedBasketArr) {
          if (userBasket.userEmail === action.payload) {
            userBasket.basket.forEach((item) => {
              if (item.price.includes(" "))
                priceValue.push(+item.price.split(" ").join(""));
              else priceValue.push(+item.price);

              state.price = priceValue.reduce((acc, item) => acc + item, 0);
            }, 0);
          }
        }
    },

    minusPrice: (state, action) => {
      if (action.payload.price.includes(" ")) {
        state.price -=
          +action.payload.price.split(" ").join("") * action.payload.amount;
      } else state.price -= +action.payload.price * action.payload.amount;
    },

    setUniqueBasket: (state) => {
      state.amountOfProduct = []; // обнуление кол-ва продуктов, чтобы не записывать их повторно
      state.uniqueBasket = [...state.basket]; // такая копия чтобы не дублировалось в state.basket

      function itemCheck(item) {
        // Функция делящая товары на уникальные и повторяющиеся
        if (state.uniqueBasket.indexOf(item.id) === -1) {
          state.uniqueBasket.push(item.id); // Push в массив с уникальными товарами, с последующим выведением в корзине
          return true;
        }

        state.amountOfProduct.push(item); // Push повторяющихся товаров в массив с похожими товарами, с последующим подсчетом кол-ва выбранных товаров
        return false;
      }

      state.uniqueBasket = state.basket?.filter((item) => itemCheck(item));
    },

    setSavedBasket: (state, action) => {
      // Сохранение объектов корзины пользователей

      let savedBasketArr = JSON.parse(localStorage.getItem("savedBasket"));
      let uniqueArr = [];

      if (savedBasketArr) {
        savedBasketArr.forEach((item, index) => {
          if (item.userEmail === action.payload.userEmail) {
            savedBasketArr.splice(index, 1, action.payload);
          } else savedBasketArr.push(action.payload);
        });

        function check(item) {
          if (uniqueArr.indexOf(item) === -1) {
            uniqueArr.push(item);
            return true;
          }

          return false;
        }

        uniqueArr = savedBasketArr.filter((item) => check(item));

        localStorage.setItem("savedBasket", JSON.stringify(uniqueArr));
      } else
        localStorage.setItem("savedBasket", JSON.stringify([action.payload]));
    },

    setBasketForLoggedUser: (state, action) => {
      // получение сохраненной корзины юзера при авторизации
      let savedBasketArr = JSON.parse(localStorage.getItem("savedBasket"));

      if (!savedBasketArr) {
        return;
      } else {
        savedBasketArr.forEach((basket) => {
          if (basket.userEmail === action.payload) state.basket = basket.basket;
        });
      }
    },
  },
});

// экспорт экшен объектов
export const {
  addToBasket,
  deleteProd,
  deleteAllProds,
  checkPrice,
  minusPrice,
  setUniqueBasket,
  setSavedBasket,
  setBasketForLoggedUser,
} = basketSlice.actions;

export default basketSlice.reducer; // Дефолтный экспорт редьюсера, потом можно переименовать в импорте
