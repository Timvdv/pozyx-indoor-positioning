import { json, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Indoor positioning with Pozyx",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader() {
  return json({
    ENV: {
      POZYX_ENDPOINT: process.env.POZYX_ENDPOINT,
      POZYX_CLIENT_ID: process.env.POZYX_CLIENT_ID,
      POZYX_PASSWORD: process.env.POZYX_PASSWORD
    },
  });
}

export default function App() {
  const data = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />

        <style dangerouslySetInnerHTML={{
          __html: `html, body {
            margin: 0;
            padding: 0;
          }`
        }}>

        </style>
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(
              data.ENV
            )}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );


}
