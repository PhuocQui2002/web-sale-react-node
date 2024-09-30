/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./redux/stores.js";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  //</React.StrictMode>
);
// "dev": "vite",
