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
import { MantineProvider } from '@mantine/core';
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   // <React.StrictMode>
   <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles >
   <AuthContextProvider>
   <Provider store={store}>
      <PostsContextProvider>
   <BrowserRouter>
      <App />
   </BrowserRouter>
      </PostsContextProvider>
   </Provider>
   </AuthContextProvider>
   </MantineProvider>,
   // </React.StrictMode>,
);
