// React
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// Context
import { PostsContextProvider } from "./context/PostsContext";
import { AuthContextProvider } from "./context/AuthContext";
// Redux
import { Provider } from 'react-redux';
import { store } from './app/store';
// Utilities
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   // <React.StrictMode>
   <AuthContextProvider>
   <Provider store={store}>
      <PostsContextProvider>
   <BrowserRouter>
      <App />
   </BrowserRouter>
      </PostsContextProvider>
   </Provider>
   </AuthContextProvider>,
   // </React.StrictMode>,
);
