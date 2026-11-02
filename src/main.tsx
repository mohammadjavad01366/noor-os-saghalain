import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import routes from "@/routes";
import App from "@/App";
import { ContentProvider } from "@/content/store";
import "@/global";

const container = document.getElementById("root") as HTMLElement;

const root = createRoot(container);

const tree = [
  {
    path: "/",
    element: <App />,
    children: routes,
    errorElement: <div>error</div>,
  },
];

/**
 * Clean browser URLs by default. The WordPress theme build sets
 * `VITE_ROUTER_MODE=hash` so a plain PHP host needs no per-route rewrite
 * rules; the static export keeps real paths plus an .htaccess fallback.
 */
const router =
  import.meta.env.VITE_ROUTER_MODE === "hash" ? createHashRouter(tree) : createBrowserRouter(tree);

root.render(
  <StrictMode>
    <ContentProvider>
      <RouterProvider router={router} />
    </ContentProvider>
  </StrictMode>,
);
