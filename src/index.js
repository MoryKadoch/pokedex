import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import reportWebVitals from "./reportWebVitals";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import App from "./App";
import Pokemons from "./containers/Pokemons";
import PokemonDetails from "./containers/PokemonDetails";
import PokemonsFavorites from "./containers/PokemonsFavorites";

import "./index.css";
import { Favorite } from "@mui/icons-material";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Pokemons/>,
      },
      {
        path: "/pokemon/:slug",
        element: <PokemonDetails />,
      },
      {
        path: "/favorites",
        element: <PokemonsFavorites />,
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();