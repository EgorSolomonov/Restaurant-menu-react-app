import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { store } from "./Store/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    {/* // обертка над приложением для прокидывания стора */}
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);
