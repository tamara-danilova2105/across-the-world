import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/styles/index.scss";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./app/providers/AuthProvider";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
