import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "../Slices/basketSlice";
import productSlice from "../Slices/productSlice"; // переименованный импорт Слайса
import userSlice from "../Slices/userSlice";

// Создание стора
export const store = configureStore({
  // создание редьюсера
  reducer: {
    // использование слайсов в качестве редьюсеров
    product: productSlice,
    basket: basketSlice,
    user: userSlice,
  },
});
