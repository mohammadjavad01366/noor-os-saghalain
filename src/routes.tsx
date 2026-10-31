import { lazy, Suspense, type ReactNode } from "react";
import { type RouteObject } from "react-router-dom";

const SiteLayout = lazy(() => import("@/components/layout/SiteLayout"));
const Index = lazy(() => import("@/pages/index"));
const About = lazy(() => import("@/pages/about"));
const Quran = lazy(() => import("@/pages/quran"));
const Education = lazy(() => import("@/pages/education"));
const Activities = lazy(() => import("@/pages/activities"));
const Activity = lazy(() => import("@/pages/activity"));
const News = lazy(() => import("@/pages/news"));
const Article = lazy(() => import("@/pages/article"));
const Gallery = lazy(() => import("@/pages/gallery"));
const Contact = lazy(() => import("@/pages/contact"));
const Admin = lazy(() => import("@/pages/admin"));
const Notfound = lazy(() => import("@/pages/404"));

const page = (element: ReactNode) => <Suspense fallback={null}>{element}</Suspense>;

export const routes: Array<RouteObject> = [
  {
    element: page(<SiteLayout />),
    children: [
      { index: true, element: page(<Index />) },
      { path: "about", element: page(<About />) },
      { path: "quran", element: page(<Quran />) },
      { path: "education", element: page(<Education />) },
      { path: "activities", element: page(<Activities />) },
      { path: "activities/:slug", element: page(<Activity />) },
      { path: "news", element: page(<News />) },
      { path: "news/:slug", element: page(<Article />) },
      { path: "gallery", element: page(<Gallery />) },
      { path: "contact", element: page(<Contact />) },
    ],
  },
  { path: "/admin", element: page(<Admin />) },
  { path: "*", element: page(<Notfound />) },
];

export default routes;
