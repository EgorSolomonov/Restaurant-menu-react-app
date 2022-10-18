import React from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../Slices/userSlice";
import "./Registration.scss";
import { Formik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";

const Registration = React.memo(() => {
  const dispatch = useDispatch();
  let userArr = JSON.parse(localStorage.getItem("userArr"));

  const validationSchema = yup.object().shape({
    // Принятие объекта и задание ему формы через yup
    email: yup // Св-во строка с выведением текста ошибки и параметром - обязательно
      .string()
      .email("Неверный формат")
      .typeError("Должно быть строкой")
      .required("Введите email"),
    password: yup // Св-во строка с выведением текста ошибки и параметром - обязательно
      .string()
      .typeError("Должно быть строкой или числом")
      .required("Введите пароль")
      .min(8, "Пароль должен содержать минимум 8 символов"),
    subscribed: yup.boolean().oneOf([true], "Нужно подписаться"),
  });

  return (
    <div className="registration">
      <Formik
        initialValues={{ email: "", password: "", subscribed: false }}
        validateOnBlur // Проверка формы по наведению
        onSubmit={(values) => {
          // Функция передачи значения из формы во вне
          if (!userArr)
            dispatch(
              setUserData({
                data: Object.values(values),
              })
            );
          else
            userArr?.forEach((userItem) => {
              if (values.email === userItem.email) {
                const underButtonError = document.querySelector(".login-error");
                underButtonError.style.visibility = "visible";
              }

              if (userArr.length !== 0 && values.email !== userItem.email) {
                dispatch(
                  setUserData({
                    data: Object.values(values),
                  })
                );
              }
            });
        }}
        validationSchema={validationSchema} // Схема валидации из yup
      >
        {({
          //  Передача в форму необходимых значений и методов
          values, // Значения
          errors, // Ошибки
          touched, // Свойство косания инпута
          handleChange, // Метод реагирующий на изменения в форме
          handleBlur, // Метод реагирующий на уход из формы
          isValid, // Свойство сообщающее о корректности формы в момент времени(т.е. нет ошибок)
          handleSubmit, // Метод реагирующий на кнопку отправки значений формы
          dirty, // Свойство говорящее об изменении значения формы когда-либо
        }) => (
          <div className="main-wrapper">
            <div className="sign-up-link">
              <Link to="/login">Авторизироваться</Link>
            </div>
            <div className="title">
              <span>Регистрация</span>
            </div>
            <div className="form">
              <form action="#">
                <label className="email">Email</label>
                <div className="form__input-wrapper email-wrapper">
                  <span
                    className={
                      touched.email && errors.email
                        ? "reqsymbolError"
                        : "reqsymbol"
                    }
                  >
                    *
                  </span>
                  <input
                    className={touched.email && errors.email ? "error" : null}
                    type="email"
                    name="email"
                    id="emailSignUp"
                    placeholder="Введите email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                  />
                  {touched.email && errors.email ? (
                    <span className="under-input-line">{errors.email}</span>
                  ) : null}
                </div>

                <label className="password">Пароль</label>
                <div className="form__input-wrapper password-wrapper">
                  <span
                    className={
                      touched.password && errors.password
                        ? "reqsymbolError"
                        : "reqsymbol"
                    }
                  >
                    *
                  </span>
                  <input
                    className={
                      touched.password && errors.password ? "error" : null
                    }
                    type="password"
                    name="password"
                    id="passwordSignUp"
                    placeholder="Введите пароль"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                  />
                  {touched.password && errors.password ? (
                    <span className="under-input-line">{errors.password}</span>
                  ) : null}
                </div>

                <div className="form__input-wrapper checkbox-wrapper">
                  <span
                    className={
                      touched.subscribed && errors.subscribed
                        ? "reqsymbolError"
                        : "reqsymbol"
                    }
                  >
                    *
                  </span>
                  <div className="form__checkbox">
                    <input
                      className={
                        touched.subscribed && errors.subscribed
                          ? "invisible"
                          : null
                      }
                      onChange={handleChange}
                      checked={values.subscribed}
                      name="subscribed"
                      type="checkbox"
                      id="checkboxSignUp"
                    />
                    <label id="checklabel" htmlFor="checkboxSignUp"></label>
                    <span>Я согласен получать обновления на почту</span>
                  </div>
                  {touched.subscribed && errors.subscribed ? (
                    <span className="under-input-line">
                      {errors.subscribed}
                    </span>
                  ) : null}
                </div>

                <div className="button">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!isValid && !dirty}
                    className="signUp"
                  >
                    Зарегестрироваться
                  </button>
                  <span className="login-error">
                    Пользователь уже существует
                  </span>
                </div>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
});

export default Registration;
