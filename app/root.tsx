import React from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";

import ApolloContext from "./context/apollo";
import mainStyles from "~/styles/root.css";
import FavIcon from "../public/favicon.ico";

export const links = () => {
  return [
    { rel: "stylesheet", href: mainStyles },
    {
      rel: "icon",
      href: FavIcon,
      type: "image/png",
    },
  ];
};

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {
  const initialState = React.useContext(ApolloContext);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="RootWrapper">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
          {/* {React tree being added as a child of the body, and the initial cache state is assigned to the __INITIAL_STATE__ global object.} */}
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_STATE__=${JSON.stringify(
                initialState
              ).replace(/</g, "\\u003c")}`,
            }}
          />
        </div>
      </body>
    </html>
  );
}
