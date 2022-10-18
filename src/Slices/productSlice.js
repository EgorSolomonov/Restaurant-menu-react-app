import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// начальный стэйт
const initialState = {
  product: [],
  rememberedProductId: null,
};

// асинхронный запрос через промежуточную функцию thunk
export const getProducts = createAsyncThunk(
  "product/getProducts", // имя для экшн объекта, чтобы не путать
  async (_, { dispatch }) => {
    const response = await fetch("https://restaurant-small-api.herokuapp.com/");

    if (response.status === 200) {
      let result = await response.json();
      dispatch(setProductsMenu(result)); // вызов экшн функции из редьюсера
    }
  }
);

// создание слайса
export const productSlice = createSlice({
  name: "product", // название слайса
  initialState, // начальный стэйт для слайса

  // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
  // объект редьюсер слайса с возможностью прямой мутации данных, при помощи черновика от пакета Immer
  // внутри нельзя делать сайд эффекты
  reducers: {
    // экшн объект
    setProductsMenu: (state, action) => {
      state.product = action.payload;
    },

    setProductId: (state, action) => {
      state.rememberedProductId = action.payload;
      localStorage.setItem("prodId", action.payload);
    },
  },
});

// экспорт экшен объектов
export const { setProductsMenu, setProductId } = productSlice.actions;

export default productSlice.reducer; // Дефолтный экспорт редьюсера, потом можно переименовать в импорте
