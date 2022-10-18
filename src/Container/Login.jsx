import React from "react";
import "./Login.scss";
import { useDispatch } from "react-redux";
import { setUserLoggedIn } from "../Slices/userSlice";
import { Formik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";

const Login = React.memo(() => {
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
  });

  return (
    <div className="login">
      {/* <!-- Log-in --> */}
      <Formik
        initialValues={{ email: "", password: "", subscribed: false }}
        validateOnBlur // Проверка формы по наведению
        onSubmit={(values) => {
          // Функция передачи значения из формы во вне
          userArr?.forEach((user) => {
            if (
              values.email === user.email &&
              +values.password === +user.password
            ) {
              dispatch(
                setUserLoggedIn({
                  email: values.email,
                  password: values.password,
                })
              );

              window.location.reload();
            }
            if (
              values.email !== user.email &&
              +values.password !== +user.password
            ) {
              const underButtonError = document.querySelector(".login-error");
              underButtonError.style.visibility = "visible";
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
              <Link to="/signin">Зарегестрироваться</Link>
            </div>
            <div className="title">
              <span>Вход</span>
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

                <div className="button">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!isValid && !dirty}
                    className="signUp"
                  >
                    Войти
                  </button>
                  <span className="login-error">
                    Пользователь не найден,проверьте email или пароль
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

export default Login;
