import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { store, persistor } from "../src/Redux/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ChakraProvider } from "@chakra-ui/react";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
