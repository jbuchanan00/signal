import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import React from "react";
import stylesheet from './app.css?url'

import type { Route } from "./+types/root";

import ImperativeMount from "./components/ImperativeMount";

const TOP_URL = import.meta.env.NAVBAR_URL ?? "http://localhost:5174/navbars.js"
const BOTTOM_URL = import.meta.env.BOTTOM_NAVBAR_URL ?? "http://localhost:5174/navbars.js"
const ASSET_BASE = import.meta.env.NAVBAR_ASSET_BASE ?? "http://localhost:5174/"


export const links: Route.LinksFunction = () => [
  {rel: "stylesheet", href: stylesheet}
];

export function Layout({ children }: { children: React.ReactNode }) {
  const sharedProps = {
    assetBase: ASSET_BASE
  }
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div>
          <ImperativeMount
            url={TOP_URL}
            which="TopNavInstance"
            mountProps={sharedProps}
            placeholderHeight={60} />
          <div className="children">
            {children}
          </div>
          <ImperativeMount
            url={BOTTOM_URL}
            which="BottomNavInstance"
            mountProps={sharedProps}
            placeholderHeight={60} />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
